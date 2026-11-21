import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { componentExports } from './generated/rule-data.mjs';
import { visitPossibleValues } from './style-expressions.mjs';

const packageSources = {
  '@tonic-ui/react': 'packages/react/src',
  '@tonic-ui/react-base': 'packages/react-base/src',
  '@tonic-ui/react-icons': 'packages/react-icons/src',
};
const repositoryRoots = new Map();
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

// The private plugin is run from this monorepo. Do not resolve a relative import
// merely because an unrelated project has a similarly named component file.
const getRepositoryRoot = (cwd) => {
  if (repositoryRoots.has(cwd)) {
    return repositoryRoots.get(cwd);
  }
  let directory = resolve(cwd);
  while (true) {
    if (existsSync(join(directory, 'packages/eslint-plugin/package.json')) &&
      existsSync(join(directory, 'packages/react/src/index.ts'))) {
      repositoryRoots.set(cwd, directory);
      return directory;
    }
    const parent = dirname(directory);
    if (parent === directory) {
      repositoryRoots.set(cwd, undefined);
      return undefined;
    }
    directory = parent;
  }
};

const getSourceExports = (context, source) => {
  if (hasOwn(componentExports, source)) {
    return componentExports[source];
  }

  let file;
  const root = getRepositoryRoot(context.cwd ?? context.getCwd());
  if (root === undefined) {
    return undefined;
  }
  if (source.startsWith('.')) {
    const filename = context.filename ?? context.getFilename();
    if (!isAbsolute(filename)) {
      return undefined;
    }
    file = resolve(dirname(filename), source);
  } else {
    for (const [packageName, sourceDir] of Object.entries(packageSources)) {
      if (source === `${packageName}/src` || source.startsWith(`${packageName}/src/`)) {
        file = resolve(root, sourceDir, source.slice(`${packageName}/src`.length + 1));
        break;
      }
    }
  }
  if (file === undefined) {
    return undefined;
  }

  const candidates = [
    file,
    ...['.js', '.jsx', '.ts', '.tsx'].map(extension => `${file}${extension}`),
    ...['index.js', 'index.jsx', 'index.ts', 'index.tsx'].map(name => join(file, name)),
  ];
  for (const candidate of candidates) {
    const key = relative(root, candidate).split(sep).join('/');
    if (hasOwn(componentExports, key)) {
      return componentExports[key];
    }
  }
  return undefined;
};

export const getImportBinding = (context, node, localName) => {
  let scope = context.sourceCode.getScope(node);
  while (scope) {
    const variable = scope.set.get(localName);
    if (variable) {
      if (variable.defs.length !== 1 || variable.defs[0].type !== 'ImportBinding') {
        return undefined;
      }
      const definition = variable.defs[0];
      if (['type', 'typeof'].includes(definition.parent?.importKind) ||
        ['type', 'typeof'].includes(definition.node.importKind)) {
        return undefined;
      }
      return definition;
    }
    scope = scope.upper;
  }
  return undefined;
};

export const getTonicComponent = (context, openingElement) => {
  const tag = openingElement.name;
  let localName;
  let memberName;
  if (tag.type === 'JSXIdentifier') {
    // Lowercase JSX identifiers are intrinsic elements, even if a binding exists.
    if (/^[a-z]/.test(tag.name)) {
      return undefined;
    }
    localName = tag.name;
  } else if (tag.type === 'JSXMemberExpression' && tag.object.type === 'JSXIdentifier' &&
    tag.property.type === 'JSXIdentifier') {
    localName = tag.object.name;
    memberName = tag.property.name;
  } else {
    return undefined;
  }

  const definition = getImportBinding(context, openingElement, localName);
  if (!definition) {
    return undefined;
  }
  const specifier = definition.node;
  let importedName;
  if (memberName !== undefined) {
    if (specifier.type !== 'ImportNamespaceSpecifier') {
      return undefined;
    }
    importedName = memberName;
  } else if (specifier.type === 'ImportDefaultSpecifier') {
    importedName = 'default';
  } else if (specifier.type === 'ImportSpecifier') {
    importedName = specifier.imported.name ?? specifier.imported.value;
  } else {
    return undefined;
  }

  const exports = getSourceExports(context, definition.parent.source.value);
  return exports && hasOwn(exports, importedName) ? exports[importedName] : undefined;
};

const visitObjectProperties = (expression, callback) => {
  visitPossibleValues(expression, (object) => {
    if (object.type !== 'ObjectExpression') {
      return;
    }
    for (const property of object.properties) {
      if (property.type === 'SpreadElement') {
        visitObjectProperties(property.argument, callback);
        continue;
      }
      if (property.type !== 'Property' || property.kind !== 'init') {
        continue;
      }
      const key = property.key;
      let name;
      if (!property.computed && key.type === 'Identifier') {
        name = key.name;
      } else if (key.type === 'Literal' && typeof key.value === 'string') {
        name = key.value;
      }
      if (name !== undefined) {
        callback(name, property.value, property);
      }
    }
  });
};

export const visitLiteralAttributes = (openingElement, callback) => {
  for (const attribute of openingElement.attributes) {
    if (attribute.type === 'JSXSpreadAttribute') {
      visitObjectProperties(attribute.argument, callback);
    } else if (attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier') {
      const value = attribute.value?.type === 'JSXExpressionContainer'
        ? attribute.value.expression
        : attribute.value ?? undefined;
      callback(attribute.name.name, value, attribute);
    }
  }
};

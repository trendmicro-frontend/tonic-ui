import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@babel/core';
import { system } from '@tonic-ui/styled-system';

const repositoryRoot = fileURLToPath(new URL('../../../', import.meta.url));
const packageSources = {
  '@tonic-ui/react': 'packages/react/src',
  '@tonic-ui/react-base': 'packages/react-base/src',
  '@tonic-ui/react-icons': 'packages/react-icons/src',
};
const documentedPropPackages = ['@tonic-ui/react', '@tonic-ui/react-base'];
const outputPath = fileURLToPath(new URL('../src/generated/rule-data.mjs', import.meta.url));
const stylePropSet = new Set(system.propNames);
const sortedEntries = (dir) => readdirSync(dir, { withFileTypes: true })
  .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

const readComponentSources = (dir, sources = {}) => {
  for (const entry of sortedEntries(dir)) {
    const entryPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== '__tests__') {
        readComponentSources(entryPath, sources);
      }
      continue;
    }

    // Only component files can be JSX element names; hooks and helpers (useModal.js,
    // createTheme.js) document props that no element can use.
    if (!/^[A-Z][A-Za-z0-9_]*\.js$/.test(entry.name)) {
      continue;
    }

    const source = readFileSync(entryPath, 'utf8');

    sources[basename(entry.name, '.js')] = {
      documentedProps: [...source.matchAll(/@property\s+(?:\{(?:[^{}]|\{[^{}]*\})*\}\s+)?\[?([A-Za-z0-9_]+)/g)]
        .map(match => match[1])
        .filter(name => stylePropSet.has(name)),
      inheritedFrom: [...source.matchAll(/<([A-Z][A-Za-z0-9]*)\b[^>]*\{\.\.\.rest\}/g)]
        .map(match => match[1]),
    };
  }

  return sources;
};

let componentSources = {};

for (const packageName of documentedPropPackages) {
  const sourceDir = resolve(repositoryRoot, packageSources[packageName]);
  componentSources = readComponentSources(sourceDir, componentSources);
}

const resolvedDocumentedStyleProps = {};

const getDocumentedStyleProps = (componentName, seen = new Set()) => {
  if (resolvedDocumentedStyleProps[componentName]) {
    return resolvedDocumentedStyleProps[componentName];
  }

  const source = componentSources[componentName];

  if (source === undefined || seen.has(componentName)) {
    return [];
  }

  seen.add(componentName);

  const props = new Set(source.documentedProps);

  for (const parentName of source.inheritedFrom) {
    for (const prop of getDocumentedStyleProps(parentName, new Set(seen))) {
      props.add(prop);
    }
  }

  resolvedDocumentedStyleProps[componentName] = [...props];

  return resolvedDocumentedStyleProps[componentName];
};

// Resolve only exports from the Tonic source tree. This data is generated once,
// so linting does not parse application modules or infer components from tag names.
const sourceFiles = new Map();
const collectSourceFiles = (directory) => {
  for (const entry of sortedEntries(directory)) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__') {
        collectSourceFiles(entryPath);
      }
    } else if (/\.(?:js|jsx|ts|tsx)$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
      sourceFiles.set(entryPath, undefined);
    }
  }
};

for (const sourceDir of Object.values(packageSources)) {
  collectSourceFiles(resolve(repositoryRoot, sourceDir));
}

const resolveSource = (from, source) => {
  let candidate;
  if (source.startsWith('.')) {
    candidate = resolve(dirname(from), source);
  } else {
    for (const [packageName, sourceDir] of Object.entries(packageSources)) {
      if (source === packageName) {
        candidate = resolve(repositoryRoot, sourceDir);
        break;
      }
      if (source === `${packageName}/src` || source.startsWith(`${packageName}/src/`)) {
        candidate = resolve(repositoryRoot, sourceDir, source.slice(`${packageName}/src`.length + 1));
        break;
      }
    }
  }
  if (candidate === undefined) {
    return undefined;
  }
  return [
    candidate,
    ...['.js', '.jsx', '.ts', '.tsx'].map(extension => `${candidate}${extension}`),
    ...['index.js', 'index.jsx', 'index.ts', 'index.tsx'].map(file => join(candidate, file)),
  ].find(file => sourceFiles.has(file));
};

const containsJsx = (value) => {
  if (Array.isArray(value)) {
    return value.some(containsJsx);
  }
  if (!value || typeof value !== 'object') {
    return false;
  }
  if (value.type === 'JSXElement' || value.type === 'JSXFragment') {
    return true;
  }
  return Object.entries(value).some(([key, child]) =>
    key !== 'loc' && key !== 'comments' && containsJsx(child),
  );
};

const isComponent = (value) => {
  if (!value) {
    return false;
  }
  if (value.type === 'ArrowFunctionExpression' || value.type === 'FunctionExpression' ||
    value.type === 'FunctionDeclaration') {
    return containsJsx(value.body);
  }
  if (value.type === 'ClassDeclaration' || value.type === 'ClassExpression') {
    return containsJsx(value.body);
  }
  if (value.type !== 'CallExpression') {
    return false;
  }
  let callee = value.callee;
  while (callee?.type === 'CallExpression') {
    callee = callee.callee;
  }
  const name = callee?.type === 'Identifier' ? callee.name : callee?.property?.name;
  return ['forwardRef', 'memo', 'styled', 'createSVGIcon', 'withFormControl'].includes(name);
};

const readModule = (file) => {
  const cached = sourceFiles.get(file);
  if (cached !== undefined) {
    return cached;
  }
  const ast = babel.parseSync(readFileSync(file, 'utf8'), {
    filename: file,
    babelrc: false,
    configFile: false,
    sourceType: 'module',
    parserOpts: { plugins: ['jsx', 'typescript'] },
  });
  const imports = new Map();
  const locals = new Map();
  const exports = [];
  const addDeclaration = (declaration) => {
    if (!declaration) {
      return;
    }
    if (declaration.type === 'VariableDeclaration') {
      for (const item of declaration.declarations) {
        if (item.id.type === 'Identifier' && /^[A-Z]/.test(item.id.name) && isComponent(item.init)) {
          locals.set(item.id.name, item.id.name);
        }
      }
    } else if (declaration.id?.type === 'Identifier' && /^[A-Z]/.test(declaration.id.name) &&
      isComponent(declaration)) {
      locals.set(declaration.id.name, declaration.id.name);
    }
  };
  for (const statement of ast.program.body) {
    if (statement.type === 'ImportDeclaration' && statement.importKind !== 'type') {
      for (const specifier of statement.specifiers) {
        if (specifier.importKind === 'type' || specifier.type === 'ImportNamespaceSpecifier') {
          continue;
        }
        imports.set(specifier.local.name, {
          source: statement.source.value,
          name: specifier.type === 'ImportDefaultSpecifier'
            ? 'default'
            : (specifier.imported.name ?? specifier.imported.value),
        });
      }
    } else if (statement.type === 'ExportAllDeclaration' && statement.exportKind !== 'type') {
      exports.push({ source: statement.source.value, all: true });
    } else if (statement.type === 'ExportNamedDeclaration' && statement.exportKind !== 'type') {
      addDeclaration(statement.declaration);
      if (statement.declaration?.id?.name) {
        exports.push({ name: statement.declaration.id.name, local: statement.declaration.id.name });
      }
      if (statement.declaration?.type === 'VariableDeclaration') {
        for (const item of statement.declaration.declarations) {
          if (item.id.type === 'Identifier') {
            exports.push({ name: item.id.name, local: item.id.name });
          }
        }
      }
      for (const specifier of statement.specifiers) {
        if (specifier.exportKind !== 'type') {
          exports.push({
            source: statement.source?.value,
            name: specifier.exported.name ?? specifier.exported.value,
            local: specifier.local.name ?? specifier.local.value,
          });
        }
      }
    } else if (statement.type === 'ExportDefaultDeclaration') {
      if (statement.declaration.type === 'Identifier') {
        exports.push({ name: 'default', local: statement.declaration.name });
      } else if (isComponent(statement.declaration)) {
        const name = statement.declaration.id?.name ?? basename(file).replace(/\.[^.]+$/, '');
        if (/^[A-Z]/.test(name)) {
          locals.set(name, name);
          exports.push({ name: 'default', local: name });
        }
      }
    } else {
      addDeclaration(statement);
    }
  }
  const result = { imports, locals, exports };
  sourceFiles.set(file, result);
  return result;
};

const resolvedExports = new Map();
const resolveExports = (file, seen = new Set()) => {
  if (resolvedExports.has(file)) {
    return resolvedExports.get(file);
  }
  if (seen.has(file)) {
    return {};
  }
  const visiting = new Set(seen).add(file);
  const { imports, locals, exports } = readModule(file);
  const result = {};
  for (const entry of exports) {
    if (entry.source) {
      const target = resolveSource(file, entry.source);
      if (target === undefined) {
        continue;
      }
      const sourceExports = resolveExports(target, visiting);
      if (entry.all) {
        for (const [name, component] of Object.entries(sourceExports)) {
          if (name !== 'default') {
            result[name] = component;
          }
        }
      } else if (sourceExports[entry.local]) {
        result[entry.name] = sourceExports[entry.local];
      }
      continue;
    }
    const imported = imports.get(entry.local);
    if (imported) {
      const target = resolveSource(file, imported.source);
      if (target !== undefined) {
        const component = resolveExports(target, visiting)[imported.name];
        if (component) {
          result[entry.name] = component;
        }
      }
    } else if (locals.has(entry.local)) {
      result[entry.name] = locals.get(entry.local);
    }
  }
  resolvedExports.set(file, result);
  return result;
};

const componentExports = {};
for (const file of sourceFiles.keys()) {
  // Keep empty modules too: foo.js takes precedence over foo/index.js even
  // when only the latter exports a component.
  componentExports[relative(repositoryRoot, file).split(sep).join('/')] = resolveExports(file);
}
for (const [packageName, sourceDir] of Object.entries(packageSources)) {
  const entry = resolveSource(resolve(repositoryRoot, sourceDir, 'index.ts'), packageName);
  if (entry !== undefined) {
    componentExports[packageName] = resolveExports(entry);
  }
}

const stylePropNames = [...stylePropSet].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const componentName of Object.keys(componentSources)) {
  getDocumentedStyleProps(componentName);
}

const documentedStyleProps = Object.fromEntries(
  Object.keys(resolvedDocumentedStyleProps)
    .filter(componentName => resolvedDocumentedStyleProps[componentName].length > 0)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(componentName => [
      componentName,
      [...resolvedDocumentedStyleProps[componentName]].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    ]),
);

const formatArray = (values) => `[${values.map(value => `'${value}'`).join(', ')}]`;

const formatObject = (entries) => {
  const properties = entries.map(([key, values]) => `'${key}': ${formatArray(values)}`);

  if (properties.length === 0) {
    return '{}';
  }

  return `{\n  ${properties.join(',\n  ')}\n}`;
};

const formatComponentExports = () => {
  const sorted = Object.entries(componentExports)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));
  const lines = sorted.map(([source, exports]) => {
    const entries = Object.entries(exports)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([name, component]) => `${JSON.stringify(name)}: ${JSON.stringify(component)}`);
    const mapping = entries.length ? `{ ${entries.join(', ')} }` : '{}';
    return `  ${JSON.stringify(source)}: ${mapping}`;
  });
  return `{\n${lines.join(',\n')}\n}`;
};

const generateData = () => {
  return `// Generated by scripts/generate-rule-data.mjs. Do not edit manually.

export const stylePropNames = Object.freeze(${formatArray(stylePropNames)});

export const documentedStyleProps = Object.freeze(${formatObject(Object.entries(documentedStyleProps))});

export const componentExports = Object.freeze(${formatComponentExports()});
`;
};

if (process.argv.length > 3 || (process.argv.length === 3 && process.argv[2] !== '--check')) {
  console.error('Usage: node scripts/generate-rule-data.mjs [--check]');
  process.exitCode = 1;
  process.exit(1);
}

const data = generateData();

if (process.argv[2] === '--check') {
  if (readFileSync(outputPath, 'utf8') !== data) {
    console.error('Generated rule data is missing or stale. Run yarn workspace @tonic-ui/eslint-plugin generate:rule-data.');
    process.exitCode = 1;
    process.exit(1);
  }

  process.exit(0);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, data);

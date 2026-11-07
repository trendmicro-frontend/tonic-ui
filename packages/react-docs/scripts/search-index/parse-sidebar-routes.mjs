import { parse } from '@babel/parser';

/**
 * Read a literal value from an ESTree node.
 * Only static values are supported; anything else is ignored.
 *
 * @param {object | undefined} node
 * @returns {string | number | boolean | undefined}
 */
const getStaticValue = (node) => {
  if (!node) {
    return undefined;
  }
  if (node.type === 'StringLiteral') {
    return node.value;
  }
  if (node.type === 'BooleanLiteral') {
    return node.value;
  }
  if (node.type === 'NumericLiteral') {
    return node.value;
  }
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0]?.value?.cooked;
  }
  return undefined;
};

const getProperty = (objectNode, name) => {
  return objectNode.properties.find((property) => {
    if (property.type !== 'ObjectProperty' || property.computed) {
      return false;
    }
    return property.key.name === name || property.key.value === name;
  });
};

const toRouteNode = (node) => {
  if (node?.type !== 'ObjectExpression') {
    return null;
  }

  const childrenNode = getProperty(node, 'routes')?.value;
  const children = (childrenNode?.type === 'ArrayExpression')
    ? childrenNode.elements.map(toRouteNode).filter(Boolean)
    : [];

  return {
    title: getStaticValue(getProperty(node, 'title')?.value),
    path: getStaticValue(getProperty(node, 'path')?.value),
    heading: getStaticValue(getProperty(node, 'heading')?.value) === true,
    children,
  };
};

/**
 * Parse `config/sidebar-routes.js` without executing it.
 *
 * The module imports React components for its icons, so it cannot be imported
 * directly from a Node.js build script. Parsing the static route literals keeps
 * the sidebar as the single source of truth for document titles and categories.
 *
 * @param {string} source
 * @returns {{ title: string, path?: string, heading: boolean, children: object[] }[]}
 */
export const parseSidebarRoutes = (source) => {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const declaration = ast.program.body
    .filter((node) => node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'VariableDeclaration')
    .flatMap((node) => node.declaration.declarations)
    .find((node) => node.id?.name === 'routes');

  if (!declaration || declaration.init?.type !== 'ArrayExpression') {
    throw new Error('Unable to find the exported `routes` array in config/sidebar-routes.js');
  }

  return declaration.init.elements.map(toRouteNode).filter(Boolean);
};

/**
 * Flatten the nested sidebar tree into searchable documents.
 *
 * Entries without a `path` are visual group headings and are skipped. When the
 * sidebar lists the same path twice (for example, `components/color-mode`
 * appears under both "Getting started" and "React Components"), the later
 * occurrence wins so the canonical section owns the result.
 *
 * @param {object[]} routes
 * @returns {{ title: string, path: string, category: string }[]}
 */
export const flattenSidebarRoutes = (routes) => {
  const results = [];
  const indexByPath = new Map();

  const addEntries = (nodes, category) => {
    for (const node of nodes) {
      if (node.path) {
        const entry = {
          title: node.title ?? node.path,
          path: node.path,
          category,
        };
        if (indexByPath.has(node.path)) {
          results[indexByPath.get(node.path)] = entry;
        } else {
          indexByPath.set(node.path, results.length);
          results.push(entry);
        }
      }
      if (node.children?.length > 0) {
        addEntries(node.children, category);
      }
    }
  };

  for (const node of routes) {
    if (node.children?.length > 0) {
      addEntries(node.children, node.title);
    }
  }

  return results;
};

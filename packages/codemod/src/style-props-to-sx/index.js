import fs from 'fs';
import path from 'path';
import { system, pseudoClassSelector, pseudoElementSelector } from '@tonic-ui/styled-system';

/**
 * Converts flat style props / pseudo props (e.g. `width="8x"`, `_hover={{...}}`)
 * on non-layout `@tonic-ui/react` / `@tonic-ui/react-icons` components into
 * the `sx` prop.
 *
 * Why this is safe to do mechanically: `sx`'s resolver looks up
 * `system.config[key]` for every key exactly like the flat-style-prop `system`
 * transform does (see `@tonic-ui/styled-system`'s `sx.js`), so `mr="4x"` and
 * `sx={{ mr: '4x' }}` resolve identically -- prop names move verbatim, no
 * alias expansion needed.
 *
 * A JSX tag doesn't have to be a *direct* `@tonic-ui/react(-icons)` import
 * to be in scope: an app or docs example commonly wraps a real component in
 * a local one (`const MyButton = (props) => <Button {...props} />`) and
 * calls the wrapper elsewhere with flat style props. `resolveWrapper` walks
 * relative imports (never into `node_modules` -- there's no source there to
 * read once a package is only shipped as `dist`) to find what a local
 * component ultimately forwards its rest props to, so those call sites are
 * still covered. See its own comment for the exact shape it recognizes.
 *
 * Safety design -- this errs toward NOT converting rather than guessing:
 *
 *   1. `LAYER1_EXEMPT_COMPONENTS` -- components whose own flat props ARE
 *      their intended API (Box, Flex, Grid, Stack, StackItem, Space). Never
 *      touched.
 *   2. `LAYER2_PROTECTED_PROPS` -- components with a specific prop that has
 *      real JS behavior beyond CSS, so moving it to `sx` would be a
 *      functional regression, not a style change (e.g. `Scrollbar`'s
 *      `width`/`height`/`overflow`, which the component's own logic reads
 *      directly for scroll-threshold math; `Skeleton`'s `animation`, a
 *      `'pulse' | 'wave'` variant selector that happens to share a name with
 *      the CSS `animation` property; `Toast`'s `appearance`, an
 *      `'info' | 'success' | ...` variant selector, same collision). This
 *      list was derived by statically resolving each flagged component's
 *      real source in `packages/react/src` and checking whether it (or a
 *      component it forwards `{...rest}` to) explicitly destructures the
 *      prop -- see `.claude/skills/tonic-ui-sx/scripts/docs-legacy-style-props-to-sx.js`
 *      in this monorepo for that discovery tool. This transform hardcodes the
 *      result instead of re-doing that analysis at runtime, so it stays
 *      portable for consumers who only have the published `dist` (no `src`
 *      to statically analyze). If a future `@tonic-ui/react` component
 *      introduces a similarly-named functional prop, add it here.
 *
 * Any component not in either list is assumed safe to convert. Elements
 * whose existing `sx` prop isn't a plain object literal (e.g. a variable, a
 * function, an array) are left untouched -- this transform never guesses at
 * merging into anything other than `sx={{ ... }}`.
 */

const LAYER1_EXEMPT_COMPONENTS = new Set(['Box', 'Flex', 'Grid', 'Stack', 'StackItem', 'Space']);

const LAYER2_PROTECTED_PROPS = {
  Alert: new Set(['backgroundColor', 'borderColor', 'mb']),
  CircularProgress: new Set(['width', 'height', 'color']),
  DrawerContent: new Set(['margin', 'minHeight', 'minWidth', 'width']),
  Highlight: new Set(['transform']),
  InputControl: new Set(['borderTopRightRadius', 'borderBottomRightRadius', 'width', 'borderTopLeftRadius', 'borderBottomLeftRadius']),
  LinearProgress: new Set(['color']),
  MenuList: new Set(['maxHeight', 'minWidth', 'overflowY', 'width', 'zIndex']),
  Modal: new Set(['scrollBehavior']),
  ModalContent: new Set(['width', 'margin', 'minHeight', 'minWidth']),
  Scrollbar: new Set(['maxHeight', 'overflowY', 'height', 'overflowX', 'width', 'border', 'borderColor', 'overflow', 'resize', 'minWidth', 'maxWidth', 'minHeight']),
  SearchInput: new Set(['width', 'height']),
  Skeleton: new Set(['animation']),
  Spinner: new Set(['color']),
  SubmenuList: new Set(['width']),
  TableScrollbar: new Set(['height', 'overflow']),
  Tag: new Set(['backgroundColor', 'color', 'borderRadius', 'borderColor']),
  Toast: new Set(['appearance', 'width', 'py']),
  Tooltip: new Set(['maxWidth', 'backgroundColor', 'color', 'px', 'py']),
};

function loadStyleNames() {
  const names = new Set(system.propNames);
  for (const name of Object.keys(pseudoClassSelector)) {
    names.add(name);
  }
  for (const name of Object.keys(pseudoElementSelector)) {
    names.add(name);
  }
  return names;
}

function isProtectedProp(componentName, propName) {
  return Boolean(LAYER2_PROTECTED_PROPS[componentName]?.has(propName));
}

// local name -> { source, importedName }. `importedName` is the real export
// name for a named import, or the literal string 'default' for a default
// import (independent of whatever local alias the import site chose) --
// resolving a wrapper's own exports needs the real name, not the alias.
function collectAllImports(j, root) {
  const imports = new Map();
  root.find(j.ImportDeclaration).forEach((astPath) => {
    const source = astPath.node.source.value;
    for (const specifier of astPath.node.specifiers) {
      if (specifier.type === 'ImportSpecifier') {
        imports.set(specifier.local.name, { source, importedName: specifier.imported.name });
      } else if (specifier.type === 'ImportDefaultSpecifier') {
        imports.set(specifier.local.name, { source, importedName: 'default' });
      }
    }
  });
  return imports;
}

function collectImportedComponents(j, root) {
  const imported = new Map(); // local name -> imported name
  for (const [localName, { source, importedName }] of collectAllImports(j, root)) {
    if (source === '@tonic-ui/react' || source === '@tonic-ui/react-icons') {
      imported.set(localName, importedName === 'default' ? localName : importedName);
    }
  }
  return imported;
}

// `forwardRef((props, ref) => {...})` / `memo(...)` wrapping is common on a
// component that otherwise looks like a plain function -- unwrap to the
// innermost function so param/body inspection below sees through it.
function unwrapKnownHOCs(node) {
  let current = node;
  while (current?.type === 'CallExpression' &&
    (current.callee?.name === 'forwardRef' || current.callee?.name === 'memo') &&
    current.arguments.length > 0) {
    current = current.arguments[0];
  }
  if (current?.type === 'ArrowFunctionExpression' || current?.type === 'FunctionExpression' || current?.type === 'FunctionDeclaration') {
    return current;
  }
  return null;
}

function findLocalFunctionDeclaration(j, root, name) {
  let functionNode = null;

  // const Name = (...) => {...}; / const Name = forwardRef(...);
  root.find(j.VariableDeclarator, { id: { type: 'Identifier', name } }).forEach((astPath) => {
    if (functionNode) {
      return;
    }
    functionNode = unwrapKnownHOCs(astPath.node.init);
  });
  if (functionNode) {
    return functionNode;
  }

  // function Name(...) {...}
  root.find(j.FunctionDeclaration, { id: { type: 'Identifier', name } }).forEach((astPath) => {
    if (functionNode) {
      return;
    }
    functionNode = astPath.node;
  });

  return functionNode;
}

// `exportedName` is 'default' or a named export, per collectAllImports's
// convention. Handles `export default Name;` (resolving Name's own
// declaration), `export default function Name() {}` / `export default
// (...) => {}` (declared inline), and `export const Name = ...` / `export
// function Name() {}` for named exports.
function findExportedFunction(j, root, exportedName) {
  if (exportedName === 'default') {
    let functionNode = null;
    root.find(j.ExportDefaultDeclaration).forEach((astPath) => {
      if (functionNode) {
        return;
      }
      const declaration = astPath.node.declaration;
      if (declaration.type === 'Identifier') {
        functionNode = findLocalFunctionDeclaration(j, root, declaration.name);
      } else {
        functionNode = unwrapKnownHOCs(declaration);
      }
    });
    return functionNode;
  }
  return findLocalFunctionDeclaration(j, root, exportedName);
}

// Returns `{ restName, ownProtectedProps }` describing the component's own
// first parameter: `restName` is the identifier that receives "everything
// else" (a rest element in an object pattern, or the whole parameter when
// it isn't destructured at all -- e.g. `(props) => ...`), and
// `ownProtectedProps` is the set of prop names the component destructures
// out for its own use (never forwarded, so never safe to convert here).
// Returns null when there's no parameter, or an object pattern with no rest
// element -- in the latter case nothing is forwarded, so there is nothing
// this wrapper could pass through even if it renders a real component.
function getRestParamInfo(functionNode) {
  const firstParam = functionNode.params?.[0];
  if (!firstParam) {
    return null;
  }
  if (firstParam.type === 'Identifier') {
    return { restName: firstParam.name, ownProtectedProps: new Set() };
  }
  if (firstParam.type === 'ObjectPattern') {
    const ownProtectedProps = new Set();
    let restName = null;
    for (const property of firstParam.properties) {
      if (property.type === 'RestElement' || property.type === 'ObjectRestElement' || property.type === 'SpreadPropertyPattern') {
        restName = property.argument.name;
      } else if (property.key?.type === 'Identifier') {
        ownProtectedProps.add(property.key.name);
      }
    }
    return restName ? { restName, ownProtectedProps } : null;
  }
  return null;
}

// Finds the first JSX element in `functionNode`'s body that spreads
// `restName` onto it (`{...restName}`) and returns its tag name -- this is
// what the wrapper "forwards to" from the caller's perspective.
function findForwardedTag(j, functionNode, restName) {
  let tagName = null;
  j(functionNode).find(j.JSXOpeningElement).forEach((astPath) => {
    if (tagName || astPath.node.name.type !== 'JSXIdentifier') {
      return;
    }
    const hasMatchingSpread = astPath.node.attributes.some(
      (attr) => attr.type === 'JSXSpreadAttribute' && attr.argument.type === 'Identifier' && attr.argument.name === restName,
    );
    if (hasMatchingSpread) {
      tagName = astPath.node.name.name;
    }
  });
  return tagName;
}

function resolveRelativeImportPath(fromFilePath, importSource) {
  const base = path.resolve(path.dirname(fromFilePath), importSource);
  const candidates = [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js'), path.join(base, 'index.jsx')];
  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  }) ?? null;
}

const parsedFileCache = new Map(); // absolute path -> { root } | null

function parseFileAt(j, absolutePath) {
  if (parsedFileCache.has(absolutePath)) {
    return parsedFileCache.get(absolutePath);
  }
  let result = null;
  try {
    result = { root: j(fs.readFileSync(absolutePath, 'utf8')) };
  } catch {
    result = null;
  }
  parsedFileCache.set(absolutePath, result);
  return result;
}

// Resolves what a local (non-@tonic-ui) JSX tag ultimately forwards its
// rest props to, following relative imports only -- never into
// `node_modules`, since a published package ships `dist`, not readable
// source. Recognizes: `const Name = (props) => <Real {...props} />`,
// `const Name = forwardRef(({ a, b, ...rest }, ref) => <Real {...rest} />)`,
// `function Name(...) {...}`, default or named exports, and one further
// hop when the forwarded-to tag is itself another local wrapper (bounded by
// MAX_WRAPPER_DEPTH). Returns `{ targetComponent, ownProtectedProps }` (the
// real `@tonic-ui/react(-icons)` export name, and any prop names the
// wrapper chain itself intercepts rather than forwards) or null if nothing
// resolvable was found -- callers should leave the tag untouched in that
// case, the same "unknown -> don't touch" default as everywhere else here.
const MAX_WRAPPER_DEPTH = 3;

function resolveWrapper(j, currentFilePath, currentFileImports, localName, depth) {
  if (!currentFilePath || depth > MAX_WRAPPER_DEPTH) {
    return null;
  }
  const importInfo = currentFileImports.get(localName);
  if (!importInfo || !importInfo.source.startsWith('.')) {
    return null; // only follow relative imports, not bare package specifiers
  }

  const targetPath = resolveRelativeImportPath(currentFilePath, importInfo.source);
  const parsed = targetPath && parseFileAt(j, targetPath);
  if (!parsed) {
    return null;
  }

  const functionNode = findExportedFunction(j, parsed.root, importInfo.importedName);
  const restInfo = functionNode && getRestParamInfo(functionNode);
  const forwardedTag = restInfo && findForwardedTag(j, functionNode, restInfo.restName);
  if (!forwardedTag) {
    return null;
  }

  const targetFileTonicUIImports = collectImportedComponents(j, parsed.root);
  const directTarget = targetFileTonicUIImports.get(forwardedTag);
  if (directTarget) {
    return { targetComponent: directTarget, ownProtectedProps: restInfo.ownProtectedProps };
  }

  const targetFileAllImports = collectAllImports(j, parsed.root);
  const nested = resolveWrapper(j, targetPath, targetFileAllImports, forwardedTag, depth + 1);
  if (!nested) {
    return null;
  }
  return {
    targetComponent: nested.targetComponent,
    ownProtectedProps: new Set([...restInfo.ownProtectedProps, ...nested.ownProtectedProps]),
  };
}

function toObjectPropertyValue(j, attr) {
  // No value (boolean shorthand, e.g. `disabled`) -- unusual for a style
  // prop, but handle it rather than crash.
  if (!attr.value) {
    return j.literal(true);
  }
  if (attr.value.type === 'Literal' && typeof attr.value.value === 'string') {
    // JSX attribute string values are conventionally double-quoted
    // (`width="8x"`) even in an otherwise single-quote codebase -- reusing
    // that node's `.raw` verbatim would carry the double quote into a plain
    // JS object property, where this codebase's convention is single quotes.
    // `toSource({ quote: 'single' })` only affects recast's own reprinting
    // heuristics, not a node's pinned `.raw`, so set it explicitly here.
    const literal = j.literal(attr.value.value);
    literal.raw = `'${attr.value.value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
    return literal;
  }
  if (attr.value.type === 'JSXExpressionContainer') {
    // Reuse the existing expression node (not its source text) so recast
    // reprints it using its own formatting logic, consistent with the rest
    // of the rebuilt object -- this also naturally re-indents multi-line
    // pseudo-prop objects instead of keeping their old absolute indentation.
    return attr.value.expression;
  }
  return attr.value;
}

// A freshly `j.objectExpression(...)`-built node has no original `loc`, so
// recast falls back to its own multi-line pretty-print for 2+ properties --
// fine on its own line, but for a JSX element embedded inline in surrounding
// text (`Some text <Mark sx={{...}}>more text</Mark>`), forcing the
// opening tag onto several lines can produce indentation ESLint's `--fix`
// can't fully reconcile with the sibling text nodes. When every value is a
// plain string literal we just created (the common case: `bg="red"` ->
// `bg: 'red'`), build the object by parsing a compact single-line snippet
// instead -- a PARSED node carries a real (short) loc, so recast preserves
// it as one line, matching how this codebase already writes small sx
// objects by hand (e.g. `sx={{ minWidth: 'max-content', width: '100%' }}`).
// Anything else (a reused expression, a pseudo-prop's nested object, more
// than 2 properties) falls back to the standard multi-line builder --
// per-line properties read better once there's more than a couple.
//
// Returns `{ node, singleLineText }` -- `singleLineText` is the full
// `sx={{ ... }}` source text when the single-line path was used (the caller
// can reuse it to reconstruct the whole opening tag as one line too), or
// null when the multi-line builder was used instead.
function buildSxObjectExpression(j, properties) {
  const allSimpleStringLiterals = properties.length > 0 && properties.length <= 2 &&
    properties.every((p) => p.value.type === 'Literal' && typeof p.value.value === 'string' && p.value.raw);
  if (allSimpleStringLiterals) {
    const propsSource = properties.map((p) => `${p.key.name}: ${p.value.raw}`).join(', ');
    try {
      const node = j(`const __sx__ = {${propsSource}};`).find(j.ObjectExpression).get(0).node;
      return { node, singleLineText: `sx={{${propsSource}}}` };
    } catch {
      // fall through to the builder below
    }
  }
  return { node: j.objectExpression(properties), singleLineText: null };
}

// Mutating `node.attributes` in place (the usual path) leaves recast free to
// reprint the opening tag using its own multi-line heuristics once the tag
// is long enough -- which, for a JSX element embedded inline in surrounding
// text, misaligns the closing bracket with the rest of the codebase's style
// in a way ESLint's `--fix` can't fully repair. Replacing the WHOLE node
// with a freshly-PARSED one (real loc, genuinely one line) makes recast
// preserve it as one line regardless of resulting length -- matching how a
// human would write `<Mark sx={{ ... }}>` inline with text by hand,
// line-length limits notwithstanding. Only attempted when the original tag
// was itself single-line, the new sx value collapsed to one line (see
// `buildSxObjectExpression`), and every kept attribute's own source is
// single-line (nothing to lose by reconstructing it verbatim). Returns the
// replacement node, or null when any of those conditions don't hold --
// callers fall back to the standard mutate-in-place path in that case.
function tryBuildSingleLineOpeningElement(j, source, node, toExtract, sxText) {
  if (!sxText || node.loc?.start.line !== node.loc?.end.line) {
    return null;
  }

  const attrTexts = [];
  let sxInserted = false;
  for (const attr of node.attributes) {
    if (toExtract.includes(attr)) {
      if (!sxInserted) {
        attrTexts.push(sxText);
        sxInserted = true;
      }
      continue;
    }
    const text = source.slice(attr.start, attr.end);
    if (text.includes('\n')) {
      return null; // a kept attribute already spans multiple lines -- not worth reconstructing
    }
    attrTexts.push(text);
  }

  const tagName = node.name.name;
  const attrsText = attrTexts.length > 0 ? ` ${attrTexts.join(' ')}` : '';
  const snippet = node.selfClosing ? `<${tagName}${attrsText} />;` : `<${tagName}${attrsText}>x</${tagName}>;`;
  try {
    return j(snippet).find(j.JSXOpeningElement).get(0).node;
  } catch {
    return null;
  }
}

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const styleNames = loadStyleNames();
  const imported = collectImportedComponents(j, root);
  const allImports = collectAllImports(j, root);
  const wrapperCache = new Map(); // local name -> resolveWrapper() result, memoized per file
  const manualReview = [];

  root.find(j.JSXOpeningElement).forEach((astPath) => {
    const node = astPath.node;
    if (node.name.type !== 'JSXIdentifier') {
      return;
    }
    const localName = node.name.name;
    const directImportedName = imported.get(localName);

    // Layer 1 only exempts *direct* usage of a layout primitive -- a local
    // wrapper that happens to forward to Flex/Box/etc internally isn't
    // itself a layout primitive from the caller's perspective (its own prop
    // surface isn't "the intended API" just because its implementation is),
    // so this check must run before wrapper resolution, not after.
    if (directImportedName && LAYER1_EXEMPT_COMPONENTS.has(directImportedName)) {
      return;
    }

    let importedName = directImportedName;
    let wrapperOwnProtectedProps = null;

    if (!importedName) {
      if (!wrapperCache.has(localName)) {
        wrapperCache.set(localName, resolveWrapper(j, file.path, allImports, localName, 0));
      }
      const resolved = wrapperCache.get(localName);
      if (!resolved) {
        return; // not a direct import, and not resolvable to one via forwarding
      }
      importedName = resolved.targetComponent;
      wrapperOwnProtectedProps = resolved.ownProtectedProps;
    }

    const toExtract = [];
    let existingSxAttr = null;
    for (const attr of node.attributes) {
      if (attr.type !== 'JSXAttribute') {
        continue;
      }
      const attrName = attr.name.name;
      if (attrName === 'sx') {
        existingSxAttr = attr;
        continue;
      }
      if (attrName === '__sx') {
        continue; // never touch the internal channel
      }
      if (!styleNames.has(attrName)) {
        continue;
      }
      if (isProtectedProp(importedName, attrName) || wrapperOwnProtectedProps?.has(attrName)) {
        manualReview.push(`${importedName}.${attrName}`);
        continue;
      }
      toExtract.push(attr);
    }

    if (toExtract.length === 0) {
      return;
    }

    const newProperties = toExtract.map((attr) => j.objectProperty(
      j.identifier(attr.name.name),
      toObjectPropertyValue(j, attr),
    ));

    if (existingSxAttr) {
      if (existingSxAttr.value.type === 'JSXExpressionContainer' &&
        existingSxAttr.value.expression.type === 'ObjectExpression') {
        existingSxAttr.value.expression.properties.push(...newProperties);
        node.attributes = node.attributes.filter((attr) => !toExtract.includes(attr));
      } else {
        // sx exists but isn't a plain object literal -- do not guess at a merge.
        manualReview.push(`${importedName}.sx (not a plain object literal, merge ${toExtract.map((a) => a.name.name).join('/')} manually)`);
      }
      return;
    }

    // No existing sx -- replace the first extracted attribute in place with
    // the new sx attribute (keeps it in roughly the same spot for a
    // readable diff), and drop the rest.
    const { node: sxObjectNode, singleLineText } = buildSxObjectExpression(j, newProperties);

    const singleLineOpeningElement = tryBuildSingleLineOpeningElement(
      j, file.source, node, toExtract, singleLineText,
    );
    if (singleLineOpeningElement) {
      astPath.replace(singleLineOpeningElement);
      return;
    }

    const sxAttribute = j.jsxAttribute(
      j.jsxIdentifier('sx'),
      j.jsxExpressionContainer(sxObjectNode),
    );
    const firstIndex = node.attributes.indexOf(toExtract[0]);
    node.attributes = node.attributes
      .filter((attr) => !toExtract.includes(attr));
    node.attributes.splice(firstIndex, 0, sxAttribute);
  });

  if (manualReview.length > 0) {
    // Informational, not fatal -- jscodeshift's CLI surfaces console output
    // per file regardless of verbosity level, so this is always visible when
    // running for real.
    console.warn(`${file.path}: needs manual review: ${manualReview.join(', ')}`);
  }

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
}

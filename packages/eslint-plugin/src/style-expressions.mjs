const wrappers = new Set([
  'ChainExpression', 'ParenthesizedExpression', 'TSAsExpression', 'TSSatisfiesExpression',
  'TSTypeAssertion', 'TSNonNullExpression', 'TypeCastExpression',
]);
const objectExpressions = new Set([
  'ArrayExpression', 'ObjectExpression', 'ArrowFunctionExpression', 'FunctionExpression',
]);
const neverKnownObject = () => false;

export const unwrapExpression = (expression) => {
  let node = expression;
  while (node && wrappers.has(node.type)) {
    node = node.expression;
  }
  return node;
};

// Object-producing expressions are always truthy and never nullish.
const staticValue = (expression, knownObject) => {
  const node = unwrapExpression(expression);
  if (node?.type === 'Literal') {
    return { truthy: Boolean(node.value), nullish: node.value === null };
  }
  if (node?.type === 'UnaryExpression' && node.operator === 'void') {
    return { truthy: false, nullish: true };
  }
  if (objectExpressions.has(node?.type) || knownObject(node)) {
    return { truthy: true, nullish: false };
  }
  return {};
};

// Visit only expressions that can be returned for the named syntax checks.
// For &&, a short-circuited left operand is falsy, so it cannot be an object or array.
export const visitPossibleValues = (expression, visit, knownObject = neverKnownObject) => {
  const node = unwrapExpression(expression);
  if (!node) {
    return;
  }
  if (node.type === 'ConditionalExpression') {
    const { truthy } = staticValue(node.test, knownObject);
    if (truthy !== false) {
      visitPossibleValues(node.consequent, visit, knownObject);
    }
    if (truthy !== true) {
      visitPossibleValues(node.alternate, visit, knownObject);
    }
    return;
  }
  if (node.type === 'LogicalExpression') {
    const { truthy, nullish } = staticValue(node.left, knownObject);
    if (node.operator === '&&') {
      if (truthy !== false) {
        visitPossibleValues(node.right, visit, knownObject);
      }
    } else {
      visitPossibleValues(node.left, visit, knownObject);
      if (node.operator === '||' ? truthy !== true : nullish !== false) {
        visitPossibleValues(node.right, visit, knownObject);
      }
    }
    return;
  }
  if (node.type === 'SequenceExpression') {
    visitPossibleValues(node.expressions[node.expressions.length - 1], visit, knownObject);
    return;
  }
  visit(node);
};

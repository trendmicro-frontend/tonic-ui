import { documentedStyleProps, stylePropNames } from '../generated/rule-data.mjs';

const stylePropSet = new Set(stylePropNames);
const documentedProps = new Map(
  Object.entries(documentedStyleProps).map(([componentName, props]) => [componentName, new Set(props)]),
);
const unsupportedFlatPropReplacements = new Map([
  ['Grid', new Map([
    ['gridGap', 'gap'],
    ['gridRowGap', 'rowGap'],
    ['gridColumnGap', 'columnGap'],
  ])],
]);
const replacementTargets = new Set(
  [...unsupportedFlatPropReplacements.values()].flatMap(replacements => [...replacements.values()]),
);

const getName = (node) => {
  return node.type === 'JSXIdentifier' ? node.name : undefined;
};

// Flat props accept breakpoint maps. In sx, objects become nested rules.
// Do not recommend moving a replacement target unless syntax rules out a map.
const isScalarOrArray = (expression) => {
  if (expression.type === 'ConditionalExpression') {
    return isScalarOrArray(expression.consequent) && isScalarOrArray(expression.alternate);
  }
  if (expression.type === 'Literal') {
    return expression.value === null || typeof expression.value !== 'object';
  }
  return expression.type === 'ArrayExpression' ||
    expression.type === 'TemplateLiteral' ||
    expression.type === 'UnaryExpression' ||
    expression.type === 'BinaryExpression';
};

export const noFlatStyleProps = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Prefer sx over flat style props.' },
    schema: [],
    messages: {
      useSx: 'Use sx instead of the flat `{{prop}}` prop on <{{element}}>: <{{element}} sx={{ {{prop}}: … }}>.',
      replaceUnsupportedProp: '<{{element}}> does not support the flat `{{prop}}` prop. Use `{{replacement}}` instead.',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        const propName = getName(node.name);

        if (propName === undefined) {
          return;
        }

        const element = node.parent;

        if (element?.type !== 'JSXOpeningElement') {
          return;
        }

        const elementName = getName(element.name);

        if (elementName === undefined) {
          return;
        }

        if (/^[a-z]/.test(elementName)) {
          return; // DOM elements are covered by no-raw-html-elements
        }

        const replacement = unsupportedFlatPropReplacements.get(elementName)?.get(propName);
        if (replacement !== undefined) {
          context.report({
            node,
            messageId: 'replaceUnsupportedProp',
            data: { element: elementName, prop: propName, replacement },
          });
          return;
        }

        if (!stylePropSet.has(propName) || documentedProps.get(elementName)?.has(propName)) {
          return;
        }

        if (replacementTargets.has(propName) && node.value?.type === 'JSXExpressionContainer' &&
          !isScalarOrArray(node.value.expression)) {
          return;
        }

        context.report({ node, messageId: 'useSx', data: { prop: propName, element: elementName } });
      },
    };
  },
};

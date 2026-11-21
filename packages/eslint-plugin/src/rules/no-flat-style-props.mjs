import { documentedStyleProps, stylePropNames } from '../generated/rule-data.mjs';
import { getTonicComponent, visitLiteralAttributes } from '../jsx-bindings.mjs';

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

// Flat props accept breakpoint maps. In sx, objects become nested rules.
// Do not recommend moving a replacement target unless syntax rules out a map.
const isScalar = (expression) => {
  if (expression.type === 'ConditionalExpression') {
    return isScalar(expression.consequent) && isScalar(expression.alternate);
  }
  if (expression.type === 'Literal') {
    return expression.value === null || typeof expression.value !== 'object';
  }
  return expression.type === 'TemplateLiteral' ||
    expression.type === 'UnaryExpression' ||
    expression.type === 'BinaryExpression';
};

const hasResponsiveArray = (expression) => {
  if (expression.type === 'ConditionalExpression') {
    return hasResponsiveArray(expression.consequent) || hasResponsiveArray(expression.alternate);
  }
  return expression.type === 'ArrayExpression';
};

export const noFlatStyleProps = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Prefer sx over flat style props.' },
    schema: [],
    messages: {
      useSx: 'Use sx instead of the flat `{{prop}}` prop on <{{element}}>: <{{element}} sx={{ {{prop}}: … }}>.',
      responsiveArray: 'The flat `{{prop}}` prop on <{{element}}> uses a responsive array. Replace it with a breakpoint object or explicit media keys in sx.',
      replaceUnsupportedProp: 'The flat `{{prop}}` prop on <{{element}}> is deprecated. Use `{{replacement}}` instead.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const elementName = getTonicComponent(context, node);
        if (elementName === undefined) {
          return;
        }

        visitLiteralAttributes(node, (propName, value, reportNode) => {
          const replacement = unsupportedFlatPropReplacements.get(elementName)?.get(propName);
          if (replacement !== undefined) {
            context.report({
              node: reportNode,
              messageId: 'replaceUnsupportedProp',
              data: { element: elementName, prop: propName, replacement },
            });
            return;
          }

          if (!stylePropSet.has(propName) || documentedProps.get(elementName)?.has(propName)) {
            return;
          }
          if (value && hasResponsiveArray(value)) {
            context.report({ node: reportNode, messageId: 'responsiveArray', data: { prop: propName, element: elementName } });
            return;
          }
          if (replacementTargets.has(propName) && value && !isScalar(value)) {
            return;
          }

          context.report({ node: reportNode, messageId: 'useSx', data: { prop: propName, element: elementName } });
        });
      },
    };
  },
};

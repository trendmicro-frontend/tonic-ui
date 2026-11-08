import { documentedStyleProps, stylePropNames } from '../generated/rule-data.mjs';

const stylePropSet = new Set(stylePropNames);
const documentedProps = new Map(
  Object.entries(documentedStyleProps).map(([componentName, props]) => [componentName, new Set(props)]),
);

const getName = (node) => {
  return node.type === 'JSXIdentifier' ? node.name : undefined;
};

export const noFlatStyleProps = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Author component styling with sx instead of flat style props.' },
    schema: [],
    messages: {
      useSx: 'Use sx instead of the flat `{{prop}}` prop on <{{element}}>: <{{element}} sx={{ {{prop}}: … }}>.',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        const propName = getName(node.name);

        if (propName === undefined || !stylePropSet.has(propName)) {
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

        if (documentedProps.get(elementName)?.has(propName)) {
          return;
        }

        context.report({ node, messageId: 'useSx', data: { prop: propName, element: elementName } });
      },
    };
  },
};

import { getImportBinding } from '../jsx-bindings.mjs';

import { unwrapExpression, visitPossibleValues } from '../style-expressions.mjs';

export const forEachPossibleValue = (context, expression, visit) => {
  visitPossibleValues(expression, visit, (node) => isComposeSxCall(context, node));
};

// composeSx always returns an array, but only imports from this module have that contract.
export const isComposeSxCall = (context, expression) => {
  const node = unwrapExpression(expression);
  if (node?.type !== 'CallExpression') {
    return false;
  }

  const callee = unwrapExpression(node.callee);
  let localName;
  let importType;
  if (callee?.type === 'Identifier') {
    localName = callee.name;
    importType = 'ImportSpecifier';
  } else if (callee?.type === 'MemberExpression' && callee.object.type === 'Identifier' &&
    ((!callee.computed && callee.property.type === 'Identifier' && callee.property.name === 'composeSx') ||
      (callee.computed && callee.property.type === 'Literal' && callee.property.value === 'composeSx'))) {
    localName = callee.object.name;
    importType = 'ImportNamespaceSpecifier';
  } else {
    return false;
  }

  const binding = getImportBinding(context, callee, localName);
  const specifier = binding?.node;
  if (binding?.parent?.source?.value !== '@tonic-ui/utils/internal' || specifier?.type !== importType) {
    return false;
  }
  return importType === 'ImportNamespaceSpecifier' ||
    (specifier.imported?.name ?? specifier.imported?.value) === 'composeSx';
};

export const noSpreadComposeSx = {
  meta: {
    type: 'problem',
    docs: { description: 'Do not spread the composeSx array as JSX props.' },
    schema: [],
    messages: {
      spreadComposeSx: 'composeSx returns an array, not props. Pass it to sx or __sx instead of spreading it.',
    },
  },
  create(context) {
    return {
      JSXSpreadAttribute(node) {
        forEachPossibleValue(context, node.argument, (value) => {
          if (isComposeSxCall(context, value)) {
            context.report({ node: value, messageId: 'spreadComposeSx' });
          }
        });
      },
    };
  },
};

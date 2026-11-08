const getName = (node) => {
  return node.type === 'JSXIdentifier' ? node.name : undefined;
};

export const noInlineStyle = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Prefer sx over inline style objects.' },
    schema: [],
    messages: {
      useSx: 'Replace the inline style object with the sx prop: map its CSS properties to sx shorthands (padding → p), and compose a handoff style inside sx: sx={[style, { textOverflow: "clip" }]}.',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (getName(node.name) !== 'style') {
          return;
        }

        context.report({ node, messageId: 'useSx' });
      },
    };
  },
};

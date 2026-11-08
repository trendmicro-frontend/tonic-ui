const getName = (node) => {
  return node.type === 'JSXIdentifier' ? node.name : undefined;
};

export const noInlineStyle = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Author component styling with sx instead of an inline style object.' },
    schema: [],
    messages: {
      useSx: 'Replace the inline style object with sx: style={{ padding: 16 }} becomes sx={{ p: "4x" }}. For a style handoff, compose it in sx: sx={[style, { textOverflow: "clip" }]}.',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (getName(node.name) !== 'style') {
          return;
        }

        context.report({
          node,
          messageId: 'useSx',
          data: {
            'padding: 16': '{{ padding: 16 }}',
            'p: "4x"': '{{ p: "4x" }}',
          },
        });
      },
    };
  },
};

const rawElementReplacements = {
  button: 'Use <Button> and move its styles into sx.',
  div: 'Use <Box> and move its styles into sx.',
  iframe: 'Use <Box as="iframe"> and move its styles into sx.',
  input: 'Use <InputControl>, <Checkbox>, <Radio>, or <Switch>.',
  label: 'Use <Checkbox>, <Radio>, or <Switch>.',
  main: 'Use <Box as="main">.',
  output: 'Use <Box as="output">.',
  select: 'Use <Select>.',
  span: 'Use <Box as="span"> and move its styles into sx.',
  textarea: 'Use <Textarea>.',
};

const getName = (node) => {
  return node.type === 'JSXIdentifier' ? node.name : undefined;
};

export const noRawHtmlElements = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Render UI with @tonic-ui/react components instead of raw HTML elements.' },
    schema: [],
    messages: {
      replace: 'Replace <{{element}}> with a @tonic-ui/react component. {{replacement}}',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const elementName = getName(node.name);
        const replacement = elementName && rawElementReplacements[elementName];

        if (replacement === undefined) {
          return;
        }

        context.report({ node, messageId: 'replace', data: { element: elementName, replacement } });
      },
    };
  },
};

import { RuleTester } from 'eslint';
import plugin from '../index.mjs';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-flat-style-props', plugin.rules['no-flat-style-props'], {
  valid: [
    { code: '<Box sx={{ p: "4x" }} />' },
    { code: '<Box />' },
    // Documented props of a real component are its public API, not style drift.
    { code: '<Scrollbar width={100} height={100} overflow="auto" />' },
    { code: '<TableScrollbar width={100} />' },
    { code: '<LinearProgress color="red" width={100} />' },
    { code: '<Space width={100} />' },
    // DOM elements are covered by no-raw-html-elements.
    { code: '<div width={100} />' },
    { code: '<span p="4x" />' },
    // Member expressions are not resolved to a component name.
    { code: '<UI.Box p="4x" />' },
    // Non style-prop attributes are ignored.
    { code: '<Box className="foo" id="bar" data-testid="baz" />' },
    { code: '<Box onClick={() => {}} aria-label="label" />' },
    // Spread props and refs are not style props.
    { code: '<Text ref={ref} {...props} />' },
    { code: '<Box sx={{ w: "100%" }}>{banner.content}</Box>' },
  ],
  invalid: [
    {
      code: '<Box p="4x" />',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
    },
    {
      code: '<Box width={100} />',
      errors: [{ messageId: 'useSx', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: '<Button color="red" />',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'Button' } }],
    },
    // A component that documents no style props falls back to the full style-prop set.
    {
      code: '<Custom p="4x" />',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Custom' } }],
    },
    // Documented props are per component: `color` is documented on Spinner, not on Box.
    {
      code: '<Box color="red" />',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'Box' } }],
    },
    // Every offending attribute is reported.
    {
      code: '<Box p="4x" m="2x" bg="red" />',
      errors: [
        { messageId: 'useSx', data: { prop: 'p', element: 'Box' } },
        { messageId: 'useSx', data: { prop: 'm', element: 'Box' } },
        { messageId: 'useSx', data: { prop: 'bg', element: 'Box' } },
      ],
    },
    // Reported per element, not per file.
    {
      code: '<><Box p="4x" /><Button p="4x" /></>',
      errors: [
        { messageId: 'useSx', data: { prop: 'p', element: 'Box' } },
        { messageId: 'useSx', data: { prop: 'p', element: 'Button' } },
      ],
    },
    // A style prop next to spread props, refs, and handlers.
    {
      code: '<Text ref={ref} color="text.secondary" {...props} />',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'Text' } }],
    },
    {
      code: '<Flex justifyContent="space-between" alignItems="center" columnGap="4x" mr="10x" />',
      errors: [
        { messageId: 'useSx', data: { prop: 'justifyContent', element: 'Flex' } },
        { messageId: 'useSx', data: { prop: 'alignItems', element: 'Flex' } },
        { messageId: 'useSx', data: { prop: 'columnGap', element: 'Flex' } },
        { messageId: 'useSx', data: { prop: 'mr', element: 'Flex' } },
      ],
    },
    {
      code: '<ButtonBaseIcon icon={ChevronUpIcon} disabled={page <= 1} onClick={prevPage} py={0} />',
      errors: [{ messageId: 'useSx', data: { prop: 'py', element: 'ButtonBaseIcon' } }],
    },
    {
      code: '<SuperscriptText color={textColor}>{children}</SuperscriptText>',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'SuperscriptText' } }],
    },
  ],
});

ruleTester.run('no-inline-style', plugin.rules['no-inline-style'], {
  valid: [
    { code: '<Box sx={style} />' },
    { code: '<Box sx={{ padding: 16 }} />' },
    { code: '<Box className="foo" />' },
    // Only the exact `style` attribute is an inline style.
    { code: '<Box styleName="foo" />' },
    // A spread attribute has no name to match.
    { code: '<Box {...style} />' },
  ],
  invalid: [
    {
      code: '<Box style={{ padding: 16 }} />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<Box style={style} />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<div style={{ padding: 16 }} />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<><Box style={style} /><Button style={style} /></>',
      errors: [{ messageId: 'useSx' }, { messageId: 'useSx' }],
    },
  ],
});

const rawElementReplacements = {
  a: 'Use <Link>.',
  button: 'Use <Button> and move its styles into sx.',
  div: 'Use <Box> and move its styles into sx.',
  hr: 'Use <Divider>.',
  iframe: 'Use <Box as="iframe"> and move its styles into sx.',
  input: 'Use <InputControl>, <Checkbox>, <Radio>, or <Switch>.',
  label: 'Use <Checkbox>, <Radio>, or <Switch>.',
  main: 'Use <Box as="main">.',
  output: 'Use <Box as="output">.',
  p: 'Use <Text>.',
  select: 'Use <Select>.',
  span: 'Use <Box as="span"> and move its styles into sx.',
  textarea: 'Use <Textarea>.',
};

ruleTester.run('no-raw-html-elements', plugin.rules['no-raw-html-elements'], {
  valid: [
    { code: '<Box as="div" />' },
    { code: '<Button />' },
    { code: '<InputControl />' },
    // Elements with no Tonic UI counterpart are allowed.
    { code: '<h1 />' },
    { code: '<svg />' },
    { code: '<table />' },
    { code: '<ul />' },
    { code: '<img />' },
    // Member expressions are not resolved to a raw element name.
    { code: '<UI.div />' },
  ],
  invalid: [
    // The message names the component to use instead.
    ...Object.entries(rawElementReplacements).map(([element, replacement]) => ({
      code: `<${element} />`,
      errors: [{ messageId: 'replace', data: { element, replacement } }],
    })),
    // Non-self-closing elements are reported too.
    {
      code: '<div>content</div>',
      errors: [{ messageId: 'replace' }],
    },
    {
      code: '<><div /><span /></>',
      errors: [{ messageId: 'replace' }, { messageId: 'replace' }],
    },
  ],
});

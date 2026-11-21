import path from 'node:path';
import * as tsParser from '@typescript-eslint/parser';
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

const withTonicImports = ({ code, ...testCase }) => ({
  ...testCase,
  code: `import { Box, Button, Flex, Grid, LinearProgress, Scrollbar, Space, TableScrollbar, Text } from '@tonic-ui/react';\n${code}`,
});

ruleTester.run('no-flat-style-props', plugin.rules['no-flat-style-props'], {
  valid: [
    { code: '<Box sx={{ p: "4x" }} />' },
    { code: '<Box sx={[base, override]} __sx={[internal, extra]} />' },
    { code: '<Grid sx={{ gap: "4x", rowGap: "2x", columnGap: "3x" }} />' },
    { code: '<Grid gap={{ sm: "4x" }} />' },
    { code: '<Box gap={{ sm: "4x" }} />' },
    { code: '<Grid columnGap={compact ? "2x" : { md: "4x" }} />' },
    { code: '<Grid rowGap={responsiveGap} />' },
    { code: '<Box />' },
    // Documented props of a real component are its public API, not style drift.
    { code: '<Scrollbar width={100} height={100} overflow="auto" />' },
    { code: '<TableScrollbar width={100} />' },
    { code: '<LinearProgress color="red" width={100} />' },
    { code: '<Space width={100} />' },
    // DOM elements are covered by no-raw-html-elements.
    { code: '<div width={100} />' },
    { code: '<span p="4x" />' },
    // Unbound members and unrelated components are not assumed to be Tonic.
    { code: '<UI.Box p="4x" />' },
    { code: '<Custom p="4x" />' },
    { code: '<ButtonBaseIcon py={0} />' },
    { code: '<SuperscriptText color={textColor} />' },
    // Non style-prop attributes are ignored.
    { code: '<Box className="foo" id="bar" data-testid="baz" />' },
    { code: '<Box onClick={() => {}} aria-label="label" />' },
    // Spread props and refs are not style props.
    { code: '<Text ref={ref} {...props} />' },
    { code: '<Box sx={{ w: "100%" }}>{banner.content}</Box>' },
  ].map(withTonicImports),
  invalid: [
    {
      code: '<Box p="4x" />',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
    },
    {
      code: '<Grid gridGap="4x" gridRowGap="2x" gridColumnGap="3x" />',
      errors: [
        { messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridGap', replacement: 'gap' } },
        { messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridRowGap', replacement: 'rowGap' } },
        { messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridColumnGap', replacement: 'columnGap' } },
      ],
    },
    {
      code: '<Grid gridGap={{ sm: "4x" }} />',
      errors: [{ messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridGap', replacement: 'gap' } }],
    },
    {
      code: '<Grid gap={["2x", null, "4x"]} />',
      errors: [{ messageId: 'responsiveArray', data: { prop: 'gap', element: 'Grid' } }],
    },
    {
      code: '<Box width={["100%", null, "50%"]} />',
      errors: [{ messageId: 'responsiveArray', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: '<Box width={compact ? ["100%", "50%"] : "75%"} />',
      errors: [{ messageId: 'responsiveArray', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: '<Box width={compact ? "75%" : (wide ? "50%" : ["100%", "25%"])} />',
      errors: [{ messageId: 'responsiveArray', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: '<Box gridGap="4x" />',
      errors: [{ messageId: 'useSx', data: { prop: 'gridGap', element: 'Box' } }],
    },
    {
      code: '<Box width={100} />',
      errors: [{ messageId: 'useSx', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: '<Button color="red" />',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'Button' } }],
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
      code: '<Grid width={contentWidth} />',
      errors: [{ messageId: 'useSx', data: { prop: 'width', element: 'Grid' } }],
    },
  ].map(withTonicImports),
});

ruleTester.run('no-flat-style-props/bindings', plugin.rules['no-flat-style-props'], {
  valid: [
    { code: 'import { Box } from "other-library"; <Box p="4x" />;' },
    { code: 'import * as UI from "other-library"; <UI.Box p="4x" />;' },
    { code: 'import { Missing as Box } from "@tonic-ui/react"; <Box p="4x" />;' },
    { code: 'import { Box } from "@tonic-ui/react-extra"; <Box p="4x" />;' },
    { code: 'import * as UI from "@tonic-ui/react"; <UI.Missing p="4x" />;' },
    { code: 'import { useColorMode as Widget } from "@tonic-ui/react"; <Widget p="4x" />;' },
    { code: 'import Box from "@tonic-ui/react/src/button/useButtonGroup"; <Box p="4x" />;' },
    {
      code: 'import { Box } from "../box"; <Box p="4x" />;',
      filename: path.resolve(process.cwd(), '../react-docs/pages/example.js'),
    },
    { code: 'import { Box } from "@tonic-ui/react"; function render(Box) { return <Box p="4x" />; }' },
    { code: 'import * as UI from "@tonic-ui/react"; function render(UI) { return <UI.Box p="4x" />; }' },
    { code: 'import { Box as box } from "@tonic-ui/react"; <box p="4x" />;' },
    { code: 'import { Grid as Layout } from "@tonic-ui/react"; <Layout gap={{ sm: "4x" }} rowGap={responsive} />;' },
    { code: 'import { Box } from "@tonic-ui/react"; <Box {...{ gap: { sm: "4x" }, [name]: "4x", ...unknown }} />;' },
    { code: 'import { Box } from "@tonic-ui/react"; <Box {...(false && { p: "4x" })} {...({} || { m: "2x" })} />;' },
    { code: 'import { Scrollbar as Scroll, LinearProgress as Progress } from "@tonic-ui/react"; <><Scroll width={100} /><Progress color="red" /></>;' },
    { code: 'import type { Box } from "@tonic-ui/react"; <Box p="4x" />;', filename: 'test.tsx', languageOptions: { parser: tsParser } },
    { code: 'import { type Box } from "@tonic-ui/react"; <Box p="4x" />;', filename: 'test.tsx', languageOptions: { parser: tsParser } },
    { code: 'import type * as UI from "@tonic-ui/react"; <UI.Box p="4x" />;', filename: 'test.tsx', languageOptions: { parser: tsParser } },
  ],
  invalid: [
    {
      code: 'import { Box as Container } from "@tonic-ui/react"; <Container p="4x" />;',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
    },
    {
      code: 'import * as UI from "@tonic-ui/react"; <UI.Grid gridGap={{ sm: "4x" }} />;',
      errors: [{ messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridGap', replacement: 'gap' } }],
    },
    {
      code: 'import { Box } from "@tonic-ui/react-base"; <Box width={42} />;',
      errors: [{ messageId: 'useSx', data: { prop: 'width', element: 'Box' } }],
    },
    {
      code: 'import { AddIcon as Plus } from "@tonic-ui/react-icons"; <Plus color="red" />;',
      errors: [{ messageId: 'useSx', data: { prop: 'color', element: 'AddIcon' } }],
    },
    {
      code: 'import { Box } from "@tonic-ui/react/src/box"; <Box p="4x" />;',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
    },
    {
      code: 'import Push from "@tonic-ui/react/src/button/Button"; <Push p="4x" />;',
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Button' } }],
    },
    {
      code: 'import Layout from "../Grid"; <Layout gridGap="4x" />;',
      filename: path.resolve(process.cwd(), '../react/src/grid/__tests__/Grid.test.js'),
      errors: [{ messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridGap', replacement: 'gap' } }],
    },
    {
      code: 'import { Box as Container } from "../box"; <Container p="4x" />;',
      filename: path.resolve(process.cwd(), '../react/src/grid/Grid.js'),
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
    },
    {
      code: 'import { Box } from "@tonic-ui/react"; <Box {...{ p: "4x", ["m"]: "2x", ...{ bg: "red" } }} />;',
      errors: [
        { type: 'Property', messageId: 'useSx', data: { prop: 'p', element: 'Box' } },
        { type: 'Property', messageId: 'useSx', data: { prop: 'm', element: 'Box' } },
        { type: 'Property', messageId: 'useSx', data: { prop: 'bg', element: 'Box' } },
      ],
    },
    {
      code: 'import { Grid } from "@tonic-ui/react"; <Grid {...{ gap: { sm: "4x" }, rowGap: responsive, width: ["1", "2"], gridGap: value }} />;',
      errors: [
        { messageId: 'responsiveArray', data: { prop: 'width', element: 'Grid' } },
        { messageId: 'replaceUnsupportedProp', data: { element: 'Grid', prop: 'gridGap', replacement: 'gap' } },
      ],
    },
    {
      code: 'import { Box } from "@tonic-ui/react"; <Box {...(flag ? { p: "4x", ...(other && { m: "2x" }) } : { bg: "red" })} />;',
      errors: [
        { messageId: 'useSx', data: { prop: 'p', element: 'Box' } },
        { messageId: 'useSx', data: { prop: 'm', element: 'Box' } },
        { messageId: 'useSx', data: { prop: 'bg', element: 'Box' } },
      ],
    },
    {
      code: 'import { Box } from "@tonic-ui/react"; <Box {...({ p: "4x" } as const)} />;',
      filename: 'test.tsx',
      languageOptions: { parser: tsParser },
      errors: [{ messageId: 'useSx', data: { prop: 'p', element: 'Box' } }],
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

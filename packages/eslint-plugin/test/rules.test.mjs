import { RuleTester } from 'eslint';
import { describe, it } from 'node:test';
import plugin from '../src/index.mjs';

RuleTester.describe = describe;
RuleTester.it = it;

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
    { code: '<Scrollbar width={100} height={100} overflow="auto" />' },
    { code: '<TableScrollbar width={100} />' },
    { code: '<div width={100} />' },
    { code: '<UI.Box p="4x" />' },
  ],
  invalid: [
    {
      code: '<Box p="4x" />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<Box width={100} />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<Button color="red" />',
      errors: [{ messageId: 'useSx' }],
    },
    {
      code: '<Custom p="4x" />',
      errors: [{ messageId: 'useSx' }],
    },
  ],
});

ruleTester.run('no-inline-style', plugin.rules['no-inline-style'], {
  valid: [
    { code: '<Box sx={style} />' },
  ],
  invalid: [
    {
      code: '<Box style={{ padding: 16 }} />',
      errors: [{
        messageId: 'useSx',
        data: {
          'padding: 16': '{{ padding: 16 }}',
          'p: "4x"': '{{ p: "4x" }}',
        },
      }],
    },
    {
      code: '<Box style={style} />',
      errors: [{
        messageId: 'useSx',
        data: {
          'padding: 16': '{{ padding: 16 }}',
          'p: "4x"': '{{ p: "4x" }}',
        },
      }],
    },
  ],
});

ruleTester.run('no-raw-html-elements', plugin.rules['no-raw-html-elements'], {
  valid: [
    { code: '<Box as="div" />' },
    { code: '<Button />' },
    { code: '<h1 />' },
    { code: '<svg />' },
  ],
  invalid: Object.keys({
    button: true,
    div: true,
    iframe: true,
    input: true,
    label: true,
    main: true,
    output: true,
    select: true,
    span: true,
    textarea: true,
  }).map(element => ({
    code: `<${element} />`,
    errors: [{ messageId: 'replace' }],
  })),
});

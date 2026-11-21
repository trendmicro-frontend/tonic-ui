import { RuleTester } from 'eslint';
import * as tsParser from '@typescript-eslint/parser';
import { multilineSxArray } from '../rules/multiline-sx-array.mjs';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});
const withBox = (code) => `import { Box } from '@tonic-ui/react';\n${code}`;

ruleTester.run('multiline-sx-array', multilineSxArray, {
  valid: [
    { code: withBox('<Box\n  sx={[base, override]}\n/>;') },
    { code: withBox('<Box\n  sx={[\n    base,\n    { "@media (width >= 40rem)": { width: "50%" } },\n  ]}\n/>;') },
    { code: 'import { Box } from "other-library";\n<Box sx={[base,\n  override]} />;' },
    { code: withBox('<Box sx={{ width: [\n  "100%", "50%"] }} />;') },
  ],
  invalid: [
    {
      code: withBox('<Box\n  sx={[base, override,\n    extra]}\n/>;'),
      output: withBox('<Box\n  sx={[\n    base,\n    override,\n    extra\n  ]}\n/>;'),
      errors: [{ messageId: 'multilineArray', data: { prop: 'sx' } }],
    },
    {
      code: withBox('<Box\n  __sx={[base, // keep next to base\n    /* override */ (override), ...extra,]}\n/>;'),
      output: withBox('<Box\n  __sx={[\n    base, // keep next to base\n    /* override */\n    (override),\n    ...extra,\n  ]}\n/>;'),
      errors: [{ messageId: 'multilineArray', data: { prop: '__sx' } }],
    },
    {
      code: withBox('<Box sx={([base,\n  override] as const)} />;').replaceAll('\n', '\r\n'),
      output: withBox('<Box sx={([\n    base,\n    override\n  ] as const)} />;').replaceAll('\n', '\r\n'),
      filename: 'test.tsx',
      languageOptions: { parser: tsParser },
      errors: [{ messageId: 'multilineArray', data: { prop: 'sx' } }],
    },
  ],
});

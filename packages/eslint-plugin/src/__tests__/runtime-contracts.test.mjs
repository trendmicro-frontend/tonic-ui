import { RuleTester } from 'eslint';
import { noResponsiveStyleArrays } from '../rules/no-responsive-style-arrays.mjs';
import { noSpreadComposeSx } from '../rules/no-spread-compose-sx.mjs';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const withBox = (code) => `import { Box } from '@tonic-ui/react';\n${code}`;
const arrayError = (code, count = 1) => ({
  code,
  errors: Array.from({ length: count }, () => ({ messageId: 'responsiveArray' })),
});
const spreadError = (code, count = 1) => ({
  code,
  errors: Array.from({ length: count }, () => ({ messageId: 'spreadComposeSx' })),
});

ruleTester.run('no-responsive-style-arrays', noResponsiveStyleArrays, {
  valid: [
    {
      code: withBox(`
        <Box
          sx={[
            { width: '100%' },
            { '@media (width >= 40rem)': { width: '50%' } },
          ]}
        />
      `),
    },
    {
      code: withBox(`
        <Box
          sx={[base, { color: 'red', _hover: { color: 'blue' }, [breakpoints.gte('sm')]: { width: '50%' } }, theme => [{ p: '2x' }, theme.extra]]}
          __sx={theme => [internal, theme.extra]}
        />
      `),
    },
    { code: withBox('<Box sx={theme => { if (theme.dark) return [base, { color: "white" }]; return { color: "black" }; }} />') },
    { code: withBox('<Box sx={{ width: dynamicWidth, ...otherStyles, _hover: getHoverStyles(), color: theme => theme.colors.text }} />') },
    { code: withBox('<Box sx={{ width: getWidth(["100%", "50%"]) }} />') },
    { code: withBox('<Box {...props} {...{ sx: consumerStyles, __sx: internalStyles }} />') },
    { code: withBox('<Box sx={{ width: false && ["100%"], height: ["ignored"] && "auto", opacity: true ? 1 : [0] }} />') },
    { code: withBox('<Box sx={{ width: (["discarded"], "100%"), color: () => { const helper = () => ["not returned"]; return "red"; } }} />') },
    { code: withBox('<Box sx={{ width: () => () => () => ["not evaluated"] }} />') },
    { code: withBox('<Box sx={{ width: async () => ["not a direct return"], height: function* () { return ["not a direct return"]; } }} />') },
    { code: withBox('<Box sx={{ ...{ _hover: { color: "red" } }, [breakpoints.gte("md")]: { width: "50%" } }} />') },
    { code: withBox('<Box sx={[...[{ color: "red" }, ...baseStyles], { width: "100%" }]} />') },
    { code: '<div sx={{ width: ["100%", "50%"] }} />' },
    { code: '<Box sx={{ width: ["100%", "50%"] }} />' },
    { code: 'import { Box } from "other-library"; <Box sx={{ width: ["100%", "50%"] }} />;' },
    { code: 'import * as UI from "other-library"; <UI.Box sx={{ width: ["100%", "50%"] }} />;' },
    { code: 'import { Box } from "@tonic-ui/react"; function Example(Box) { return <Box sx={{ width: ["100%"] }} />; }' },
    { code: 'import * as UI from "@tonic-ui/react"; function Example(UI) { return <UI.Box sx={{ width: ["100%"] }} />; }' },
    { code: withBox('import { composeSx } from "other-library"; <Box sx={composeSx({ width: ["100%"] })} />;') },
    { code: withBox('import { composeSx } from "@tonic-ui/utils/internal"; function Example(composeSx) { return <Box sx={composeSx({ width: ["100%"] })} />; }') },
    { code: withBox('import { composeSx } from "@tonic-ui/utils/internal"; <Box sx={composeSx(base, override)} __sx={composeSx(internal, extra)} />;') },
    { code: withBox('import { composeSx } from "@tonic-ui/utils/internal"; <Box sx={composeSx(base) || { width: ["unreachable"] }} />;') },
  ],
  invalid: [
    arrayError('import { Box } from "@tonic-ui/react-base"; <Box sx={{ width: ["100%"] }} />;'),
    arrayError('import BaseBox from "@tonic-ui/react-base/src/box/Box"; <BaseBox sx={{ width: ["100%"] }} />;'),
    arrayError(withBox('<Box sx={{ width: ["100%", "50%"] }} />')),
    arrayError('import { Box as Container } from "@tonic-ui/react"; <Container __sx={{ color: ["red", "blue"] }} />;'),
    arrayError('import * as UI from "@tonic-ui/react"; <UI.Box sx={{ width: [] }} />;'),
    arrayError(withBox('<Box sx={{ width: compact ? ["100%", "50%"] : "75%", [name]: [1, 2] }} />'), 2),
    arrayError(withBox('<Box sx={compact ? { width: ["100%"] } : { color: ["red"] }} />'), 2),
    arrayError(withBox('<Box sx={{ _hover: { width: ["100%"] }, "&:focus": { color: ["red"] }, _before: { content: ["x"] } }} />'), 3),
    arrayError(withBox('<Box sx={theme => ({ [theme.breakpoints.gte("sm")]: () => ({ _hover: { width: ["100%", "50%"] } }) })} />')),
    arrayError(withBox('<Box sx={theme => { if (theme.dark) return { color: ["white"] }; return [base, { width: ["100%"] }]; }} />'), 2),
    arrayError(withBox('<Box __sx={{ width: theme => { if (theme.compact) return ["50%"]; return "100%"; }, _hover: () => ({ color: ["red"] }) }} />'), 2),
    arrayError(withBox('<Box sx={{ ...{ width: ["100%"] }, _hover: { ...{ color: ["red"] } } }} />'), 2),
    arrayError(withBox('<Box sx={{ ...(flag ? { width: ["100%"] } : { _hover: () => ({ color: ["red"] }) }) }} />'), 2),
    arrayError(withBox('<Box {...{ sx: { width: ["100%"] }, __sx: theme => ({ p: [1, 2] }) }} />'), 2),
    arrayError(withBox('<Box {...(flag ? { sx: { width: ["100%"] } } : { ...{ __sx: { color: ["red"] } } })} />'), 2),
    arrayError(withBox('<Box sx={[...[{ width: ["100%"] }], { color: "red" }]} />')),
    arrayError(withBox('<Box sx={{ ...[[1, 2]] }} />')),
    arrayError(withBox('<Box sx={{ width: flag && ["100%"], color: flag || ["red"] }} />'), 2),
    arrayError(withBox('<Box sx={{ width: { sm: ["100%"] } }} />')),
    arrayError(withBox('import { composeSx as compose } from "@tonic-ui/utils/internal"; <Box sx={compose(base, { width: ["100%"] })} __sx={compose(...[{ color: ["red"] }])} />;'), 2),
    arrayError(withBox('import * as styles from "@tonic-ui/utils/internal"; <Box sx={{ width: styles.composeSx(base, override) }} />;')),
    arrayError(withBox('import { composeSx } from "@tonic-ui/utils/internal"; <Box sx={{ width: composeSx(base) || ["unreachable"] }} />;')),
  ],
});

ruleTester.run('no-spread-compose-sx', noSpreadComposeSx, {
  valid: [
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box sx={composeSx(base, override)} __sx={composeSx(internal, extra)} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box {...{ sx: composeSx(base, override) }} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box {...withStyles(composeSx(base, override))} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(composeSx(base), props)} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(composeSx(base) && props)} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(false ? composeSx(base) : props)} />;' },
    { code: '<Box {...composeSx(base, override)} />' },
    { code: 'import { composeSx } from "other-library"; <Box {...composeSx(base)} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils"; <Box {...composeSx(base)} />;' },
    { code: 'import { other as composeSx } from "@tonic-ui/utils/internal"; <Box {...composeSx(base)} />;' },
    { code: 'import * as styles from "@tonic-ui/utils/internal"; <Box {...styles[key](base)} />;' },
    { code: 'import { composeSx } from "@tonic-ui/utils/internal"; function Example(composeSx) { return <Box {...composeSx(base)} />; }' },
    { code: 'import * as styles from "@tonic-ui/utils/internal"; function Example(styles) { return <Box {...styles.composeSx(base)} />; }' },
  ],
  invalid: [
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; <Box {...composeSx(base, override)} />;'),
    spreadError('import { composeSx as compose } from "@tonic-ui/utils/internal"; <div {...compose(base, override)} />;'),
    spreadError('import * as styles from "@tonic-ui/utils/internal"; <ThirdParty {...styles.composeSx(base, override)} />;'),
    spreadError('import * as styles from "@tonic-ui/utils/internal"; <Box {...styles["composeSx"](base)} />;'),
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; <Box {...composeSx?.(base)} />;'),
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(flag && composeSx(base))} />;'),
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(flag ? composeSx(base) : props)} />;'),
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; <Box {...(composeSx(base) || composeSx(override))} />;'),
    spreadError('import { composeSx } from "@tonic-ui/utils/internal"; import * as styles from "@tonic-ui/utils/internal"; <Box {...(flag ? composeSx(base) : styles.composeSx(override))} />;', 2),
  ],
});

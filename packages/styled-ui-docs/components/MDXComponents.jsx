/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  Box,
  Heading,
  Image,
  Link,
  useColorMode,
} from '@trendmicro/react-styled-ui';
import Code from './Code';
import CodeBlock from './CodeBlock';

const mapColorModeToHeadingColor = (colorMode) => ({
  light: 'black:secondary',
  dark: 'white:secondary',
}[colorMode]);

const p = props => (
  <Box
    as="p"
    mt={0}
    mb="4x"
    display="block"
    {...props}
  />
);

const H1 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h1"
      mt="6x"
      mb="4x"
      pb="2x"
      borderBottom="1px solid #eaecef"
      color={color}
      fontSize="4xl"
      fontWeight="semibold"
      lineHeight="4xl"
      {...props}
    />
  );
};

const H2 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h2"
      mt="6x"
      mb="4x"
      pb="2x"
      borderBottom="1px solid #eaecef"
      color={color}
      fontSize="2xl"
      fontWeight="semibold"
      lineHeight="2xl"
      {...props}
    />
  );
};

const H3 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h3"
      mt="6x"
      mb="4x"
      color={color}
      fontSize="xl"
      fontWeight="semibold"
      lineHeight="xl"
      {...props}
    />
  );
};

const H4 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h4"
      color={color}
      fontSize="lg"
      fontWeight="semibold"
      lineHeight="lg"
      my="2x"
      {...props}
    />
  );
};

const H5 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h5"
      mt="6x"
      mb="4x"
      color={color}
      fontSize="md"
      fontWeight="semibold"
      lineHeight="md"
      {...props}
    />
  );
};

const H6 = props => {
  const { colorMode } = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Heading
      as="h6"
      mt="6x"
      mb="4x"
      color={color}
      fontSize="sm"
      fontWeight="semibold"
      lineHeight="sm"
      {...props}
    />
  );
};

const Blockquote = props => (
  <Box
    as="blockquote"
    mt={0}
    mb="4x"
    {...props}
  />
);

const ul = props => (
  <Box
    as="ul"
    mt={0}
    mb="4x"
    {...props}
  />
);

const ol = props => (
  <Box
    as="ol"
    mt={0}
    mb="4x"
    {...props}
  />
);

const li = props => (
  <Box
    as="li"
    {...props}
  />
);

const table = props => (
  <Box
    as="table"
    mt={0}
    mb="4x"
    display="block"
    width="100%"
    css={css`
      border-spacing: 0;
      border-collapse: collapse;
    `}
    {...props}
  />
);

const thead = props => (
  <Box
    as="thead"
    verticalAlign="middle"
    borderColor="inherit"
    {...props}
  />
);

const tbody = props => (
  <Box
    as="tbody"
    verticalAlign="middle"
    borderColor="inherit"
    {...props}
  />
);

const tr = props => (
  <Box
    as="tr"
    {...props}
  />
);

const th = ({ align, ...props }) => (
  <Box
    as="th"
    px="3x"
    py="2x"
    border={1}
    borderColor="gray:20"
    fontWeight="semibold"
    whiteSpace="nowrap"
    textAlign={align}
    {...props}
  />
);

const td = props => (
  <Box
    as="td"
    px="3x"
    py="2x"
    border={1}
    borderColor="gray:20"
    {...props}
  />
);

const pre = props => (
  <Box
    as="pre"
    mt={0}
    mb="4x"
    {...props}
  />
);

const code = props => (
  <CodeBlock {...props} />
);

const inlineCode = props => (
  <Code
    fontSize=".875em"
    {...props}
  />
);

const hr = props => (
  <Box
    as="hr"
    my="3x"
    borderTop={1}
    borderTopColor="gray:70"
    {...props}
  />
);

const a = props => (
  <Link
    as="a"
    {...props}
  />
);

const img = Image;

/**
 * https://mdxjs.com/getting-started#table-of-components
 */
const MDXComponents = {
  p,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  blockquote: Blockquote,
  ul,
  ol,
  li,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  pre,
  code,
  inlineCode,
  hr,
  a,
  img,
};

export default MDXComponents;

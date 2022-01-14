import React from 'react';
import { css } from '@emotion/react';
import {
  Box,
  Image,
  Link,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import Code from './Code';
import CodeBlock from './CodeBlock';

const mapColorModeToHeadingColor = (colorMode) => ({
  light: 'black:secondary',
  dark: 'white:secondary',
}[colorMode]);

const mapColorModeToTableBorderColor = (colorMode) => ({
  light: 'gray:40',
  dark: 'gray:70',
}[colorMode]);

const p = props => (
  <Box
    as="p"
    fontSize="md"
    lineHeight="md"
    mt={0}
    mb="4x"
    {...props}
  />
);

const H1 = props => {
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);
  const borderColor = {
    light: 'gray:40', //FIX ME
    dark: 'gray:60',
  }[colorMode];

  return (
    <Box
      as="h1"
      mt="6x"
      mb="4x"
      pb="2x"
      borderBottom={1}
      borderBottomColor={borderColor}
      color={color}
      fontSize="3xl"
      fontWeight="normal"
      lineHeight="3xl"
      {...props}
    />
  );
};

const H2 = props => {
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);
  const borderColor = {
    light: 'gray:40', //FIX ME
    dark: 'gray:60',
  }[colorMode];

  return (
    <Box
      as="h2"
      mt="6x"
      mb="4x"
      pb="2x"
      borderBottom={1}
      borderBottomColor={borderColor}
      color={color}
      fontSize="2xl"
      fontWeight="normal"
      lineHeight="2xl"
      {...props}
    />
  );
};

const H3 = props => {
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Box
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
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Box
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
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Box
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
  const [colorMode] = useColorMode();
  const color = mapColorModeToHeadingColor(colorMode);

  return (
    <Box
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

const Blockquote = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:60',
  }[colorMode];

  return (
    <Box
      as="blockquote"
      fontSize="md"
      lineHeight="md"
      backgroundColor={backgroundColor}
      borderLeft={4}
      borderLeftColor={borderColor}
      boxShadow={colorStyle.shadow.thin}
      color={colorStyle.color.primary}
      mx={0}
      mb="4x"
      px="4x"
      py="3x"
      css={css`
        p {
          margin-bottom: 0;
        }
      `}
      {...props}
    />
  );
};

const ul = props => (
  <Box
    as="ul"
    fontSize="md"
    lineHeight="md"
    mt={0}
    mb="4x"
    {...props}
  />
);

const ol = props => (
  <Box
    as="ol"
    fontSize="md"
    lineHeight="md"
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
    fontSize="md"
    lineHeight="md"
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

const TH = ({ align, ...props }) => {
  const [colorMode] = useColorMode();
  const borderColor = mapColorModeToTableBorderColor(colorMode);

  return (
    <Box
      as="th"
      px="3x"
      py="2x"
      fontWeight="semibold"
      whiteSpace="nowrap"
      border={1}
      borderBottom={2}
      borderColor={borderColor}
      textAlign={align}
      {...props}
    />
  );
};

const TD = ({ align, ...props }) => {
  const [colorMode] = useColorMode();
  const borderColor = mapColorModeToTableBorderColor(colorMode);

  return (
    <Box
      as="td"
      px="3x"
      py="2x"
      border={1}
      borderColor={borderColor}
      textAlign={align}
      {...props}
    />
  );
};

const pre = props => (
  <Box
    as="pre"
    fontSize="md"
    lineHeight="md"
    mt={0}
    mb="4x"
    {...props}
  />
);

const code = props => (
  <CodeBlock {...props} />
);

const inlineCode = props => (
  <Code {...props} />
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
  th: TH,
  td: TD,
  pre,
  code,
  inlineCode,
  hr,
  a,
  img,
};

export default MDXComponents;

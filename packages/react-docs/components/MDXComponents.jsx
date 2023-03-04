import styled from '@emotion/styled';
import React from 'react';
import {
  Box,
  Divider,
  Image,
  Link,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import Code from './Code';
import CodeBlock from './CodeBlock';

const p = props => (
  <Box
    as="p"
    mt={0}
    mb="4x"
    fontSize="md"
    lineHeight="lg"
    {...props}
  />
);

const H1 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h1"
      mt="8x"
      mb="2x"
      pb="2x"
      borderBottom={1}
      borderBottomColor={colorStyle.divider}
      color={colorStyle.color.primary}
      fontSize="3xl"
      fontWeight="semibold"
      lineHeight="3xl"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const H2 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h2"
      mt="8x"
      mb="2x"
      color={colorStyle.color.primary}
      fontSize="2xl"
      fontWeight="semibold"
      lineHeight="2xl"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const H3 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h3"
      mt="8x"
      mb="2x"
      color={colorStyle.color.primary}
      fontSize="xl"
      fontWeight="semibold"
      lineHeight="xl"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const H4 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h4"
      mt="8x"
      mb="2x"
      color={colorStyle.color.primary}
      fontSize="lg"
      fontWeight="semibold"
      lineHeight="lg"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const H5 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h5"
      mt="8x"
      mb="2x"
      color={colorStyle.color.primary}
      fontSize="md"
      fontWeight="semibold"
      lineHeight="md"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const H6 = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      as="h6"
      mt="8x"
      mb="2x"
      color={colorStyle.color.primary}
      fontSize="sm"
      fontWeight="semibold"
      lineHeight="sm"
      scrollMarginBlock="14x"
      {...props}
    />
  );
};

const Blockquote = styled(props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    light: 'white',
    dark: 'gray:80',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:60',
  }[colorMode];

  return (
    <Box
      as="blockquote"
      fontSize="md"
      lineHeight="lg"
      backgroundColor={backgroundColor}
      borderLeft={4}
      borderLeftColor={borderColor}
      boxShadow={colorStyle.shadow.thin}
      color={colorStyle.color.primary}
      mx={0}
      mb="4x"
      px="4x"
      py="3x"
      {...props}
    />
  );
})`
  > p {
    margin-bottom: 0;
  }
`;

const ul = props => (
  <Box
    as="ul"
    fontSize="md"
    lineHeight="lg"
    mt={0}
    mb="4x"
    {...props}
  />
);

const ol = props => (
  <Box
    as="ol"
    fontSize="md"
    lineHeight="lg"
    mt={0}
    mb="4x"
    {...props}
  />
);

const li = props => (
  <Box
    as="li"
    mt="1x"
    mb="2x"
    {...props}
  />
);

const table = props => (
  <Box
    as="table"
    mt={0}
    mb="4x"
    fontSize="md"
    lineHeight="lg"
    borderCollapse="collapse"
    borderSpacing={0}
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
  const borderColor = {
    light: 'gray:40',
    dark: 'gray:70',
  }[colorMode];

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
  const borderColor = {
    light: 'gray:40',
    dark: 'gray:70',
  }[colorMode];

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

const pre = props => {
  return (
    <Box
      as="pre"
      fontSize="md"
      lineHeight="lg"
      mt={0}
      mb="4x"
    >
      <Box as="code">
        <CodeBlock {...props} />
      </Box>
    </Box>
  );
};

const code = props => (
  <Code as="code" {...props} />
);

const hr = props => (
  <Divider as="hr" my="2x" {...props} />
);

const a = props => (
  <Link as="a" {...props} />
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
  hr,
  a,
  img,
};

export default MDXComponents;

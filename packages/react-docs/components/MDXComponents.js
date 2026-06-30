import {
  Box,
  Code,
  Image,
  Link,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import { isValidElement } from 'react';
import CodeBlock from './CodeBlock';

const ParagraphComponent = props => (
  <Box
    my="2x"
    fontSize="md"
    lineHeight="lg"
    {...props}
  />
);

const H1Component = props => {
  const [colorStyle] = useColorStyle();

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

const H2Component = props => {
  const [colorStyle] = useColorStyle();

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

const H3Component = props => {
  const [colorStyle] = useColorStyle();

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

const H4Component = props => {
  const [colorStyle] = useColorStyle();

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

const H5Component = props => {
  const [colorStyle] = useColorStyle();

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

const H6Component = props => {
  const [colorStyle] = useColorStyle();

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

const BlockquoteComponent = props => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
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
      sx={{
        // The "ParagraphComponent" was changed to "div" instead of "p"
        '> div': {
          marginBottom: 0,
        },
      }}
      {...props}
    />
  );
};

const UnorderedListComponent = props => (
  <Box
    as="ul"
    fontSize="md"
    lineHeight="lg"
    mt={0}
    mb="4x"
    pl="6x"
    {...props}
  />
);

const OrderedListComponent = props => (
  <Box
    as="ol"
    fontSize="md"
    lineHeight="lg"
    mt={0}
    mb="4x"
    pl="6x"
    {...props}
  />
);

const ListItemComponent = props => (
  <Box
    as="li"
    mt="1x"
    mb="2x"
    {...props}
  />
);

const TableComponent = props => (
  <Box
    as="table"
    mt={0}
    mb="4x"
    fontSize="md"
    lineHeight="lg"
    borderCollapse="collapse"
    borderSpacing={0}
    width="100%"
    {...props}
  />
);

const THeadComponent = props => (
  <Box
    as="thead"
    verticalAlign="middle"
    borderColor="inherit"
    {...props}
  />
);

const TBodyComponent = props => (
  <Box
    as="tbody"
    verticalAlign="middle"
    borderColor="inherit"
    {...props}
  />
);

const TRComponent = props => (
  <Box
    as="tr"
    {...props}
  />
);

const THComponent = ({ align, ...props }) => {
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

const TDComponent = ({ align, ...props }) => {
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

const PreComponent = ({ children, ...rest }) => {
  const code = isValidElement(children)
    ? ensureString(children?.props?.children)
    : ensureString(children);
  const language = isValidElement(children)
    ? ensureString(children.props.className).replace(/language-/, '')
    : '';

  return (
    <CodeBlock code={code} language={language} />
  );
};

const CodeComponent = props => (
  <Code as="code" {...props} />
);

const HRComponent = props => {
  const [colorStyle] = useColorStyle();

  return (
    <Box
      as="hr"
      border={0}
      borderTop={1}
      borderColor={colorStyle.divider}
      my="4x"
      {...props}
    />
  );
};

const AnchorComponent = props => (
  <Link as="a" {...props} />
);

const ImageComponent = props => (
  <Image
    maxWidth="100%"
    alt="image-description"
    maxHeight="100%"
    {...props}
  />
);

/**
 * https://mdxjs.com/getting-started#table-of-components
 */
const MDXComponents = {
  p: ParagraphComponent,
  h1: H1Component,
  h2: H2Component,
  h3: H3Component,
  h4: H4Component,
  h5: H5Component,
  h6: H6Component,
  blockquote: BlockquoteComponent,
  ul: UnorderedListComponent,
  ol: OrderedListComponent,
  li: ListItemComponent,
  table: TableComponent,
  thead: THeadComponent,
  tbody: TBodyComponent,
  tr: TRComponent,
  th: THComponent,
  td: TDComponent,
  pre: PreComponent,
  code: CodeComponent,
  hr: HRComponent,
  a: AnchorComponent,
  img: ImageComponent,
};

export default MDXComponents;

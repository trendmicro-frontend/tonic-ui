import { Box, Stack, Text, useColorMode } from '@tonic-ui/react';
import React from 'react';

const TextBlock = (props) => {
  const [colorMode] = useColorMode();
  const borderColor = colorMode === 'dark' ? 'gray:70' : 'gray:20';

  return (
    <Box px="3x" py="2x" border={1} borderColor={borderColor}>
      <Text {...props} />
    </Box>
  );
};

const App = () => (
  <Stack direction="column" spacing="4x" shouldWrapChildren>
    <TextBlock as="i">Italic</TextBlock>
    <TextBlock as="u">Underline</TextBlock>
    <TextBlock as="abbr">Abbreviation or acronym</TextBlock>
    <TextBlock as="cite">Citation</TextBlock>
    <TextBlock as="del">Deleted</TextBlock>
    <TextBlock as="em">Emphasis</TextBlock>
    <TextBlock as="ins">Inserted</TextBlock>
    <TextBlock as="kbd">Ctrl + C</TextBlock>
    <TextBlock as="mark">Highlighted</TextBlock>
    <TextBlock as="s">Strikethrough</TextBlock>
    <TextBlock as="samp">Sample</TextBlock>
    <TextBlock as="sup">Superscript</TextBlock>
    <TextBlock as="sub">Subscript</TextBlock>
  </Stack>
);

export default App;

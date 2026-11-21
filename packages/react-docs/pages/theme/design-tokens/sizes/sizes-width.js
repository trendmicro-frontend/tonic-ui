import { Box, Flex } from '@tonic-ui/react';

const App = () => {
  const styles = {
    backgroundColor: 'background.high',
    border: 1,
    borderColor: 'border.tertiary',
    boxShadow: 'down.low',
    px: '4x',
    py: '3x',
  };

  return (
    <Flex flexDirection="column" rowGap="4x">
      <Box width="32x" {...styles}>width="32x"</Box>
      <Box width="48x" {...styles}>width="48x"</Box>
      <Box width="64x" {...styles}>width="64x"</Box>
    </Flex>
  );
};

export default App;

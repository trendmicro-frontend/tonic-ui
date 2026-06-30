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
    <Flex flexDirection="row" columnGap="4x">
      <Box height="24x" {...styles}>height="24x"</Box>
      <Box height="32x" {...styles}>height="32x"</Box>
      <Box height="40x" {...styles}>height="40x"</Box>
    </Flex>
  );
};

export default App;

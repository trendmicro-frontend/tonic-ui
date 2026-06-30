import { Box, Flex } from '@tonic-ui/react';

const App = () => {
  const styles = {
    backgroundColor: 'background.high',
    border: 1,
    borderColor: 'border.tertiary',
    boxShadow: 'down.low',
    width: '18x',
    height: '18x',
  };

  return (
    <Flex flexDirection="column" rowGap="4x">
      <Flex columnGap="1x">
        <Box {...styles} />
        <Box {...styles} />
      </Flex>
      <Flex columnGap="2x">
        <Box {...styles} />
        <Box {...styles} />
      </Flex>
      <Flex columnGap="4x">
        <Box {...styles} />
        <Box {...styles} />
      </Flex>
    </Flex>
  );
};

export default App;

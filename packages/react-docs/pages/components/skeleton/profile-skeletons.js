import { Box, Divider, Flex, Skeleton, Stack } from '@tonic-ui/react';

const App = () => {
  return (
    <Stack direction="column" width="max(320px, 50%)" backgroundColor="background.highest">
      <Flex alignItems="center" columnGap="5x" p="4x">
        <Flex flex="none">
          <Skeleton variant="circle" animation="wave" width={40} height={40} />
        </Flex>
        <Stack direction="column" spacing="4x" flex="auto">
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </Stack>
      </Flex>
      <Divider />
      <Box p="4x">
        <Skeleton variant="rectangle" animation="wave" height={160} />
      </Box>
    </Stack>
  );
};

export default App;

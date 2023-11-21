import { Box, Divider, Flex, Skeleton, Stack, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Stack direction="column" width="max(320px, 50%)" backgroundColor={colorStyle.background.secondary}>
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

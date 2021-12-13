import {
  Box,
  Flex,
  Skeleton,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const SkeletonBlock = (props) => (
  <Flex {...props}>
    <Flex flex="none" mr="4x" alignItems="center">
      <Skeleton variant="circle" width="10x" height="10x" />
    </Flex>
    <Box flex="auto">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  </Flex>
);

export default SkeletonBlock;

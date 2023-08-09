import {
  Flex,
  Skeleton,
} from '@tonic-ui/react';
import React from 'react';

const SkeletonBlock = (props) => (
  <Flex {...props}>
    <Flex flex="none" mr="4x" alignItems="center">
      <Skeleton variant="circle" width="10x" height="10x" />
    </Flex>
    <Flex flex="auto" flexDirection="column" rowGap="2x">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Flex>
  </Flex>
);

export default SkeletonBlock;

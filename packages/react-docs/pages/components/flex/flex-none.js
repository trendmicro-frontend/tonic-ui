import { Box, Flex } from '@tonic-ui/react';
import React from 'react';

const FlexItem = (props) => (
  <Box bg="teal:50" border={1} borderColor="teal:60" p="3x" mr="4x" mb="4x" {...props} />
);

const App = () => {
  return (
    <>
      <Flex bg="gray:10" p="4x" pb={0} pr={0} mb="4x">
        <FlexItem flex="auto">auto</FlexItem>
        <FlexItem flex="auto">auto</FlexItem>
        <FlexItem flex="auto">auto</FlexItem>
      </Flex>
      <Flex bg="gray:10" p="4x" pb={0} pr={0} mb="4x">
        <FlexItem flex="auto">auto</FlexItem>
        <FlexItem flex="initial">initial</FlexItem>
        <FlexItem flex="initial">initial</FlexItem>
      </Flex>
      <Flex bg="gray:10" p="4x" pb={0} pr={0} mb="4x">
        <FlexItem flex="auto">auto</FlexItem>
        <FlexItem flex="auto">auto</FlexItem>
        <FlexItem flex="none">none</FlexItem>
      </Flex>
      <Flex bg="gray:10" p="4x" pb={0} pr={0} mb="4x">
        <FlexItem flex="initial">initial</FlexItem>
        <FlexItem flex="none">none</FlexItem>
        <FlexItem flex="none">none</FlexItem>
      </Flex>
      <Flex bg="gray:10" p="4x" pb={0} pr={0}>
        <FlexItem flex={4}>4</FlexItem>
        <FlexItem flex={2}>2</FlexItem>
        <FlexItem flex={1}>1</FlexItem>
      </Flex>
    </>
  );
};

export default App;

import { Divider, Flex, Text } from '@tonic-ui/react';
import React from 'react';

export default function Custom404() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Flex alignItems="center">
        <Text
          fontSize="2xl"
          lineHeight="2xl"
        >
          404
        </Text>
        <Divider
          orientation="vertical"
          height="100%"
          mx="6x"
        />
        <Text>
          This page could not be found.
        </Text>
      </Flex>
    </Flex>
  );
}

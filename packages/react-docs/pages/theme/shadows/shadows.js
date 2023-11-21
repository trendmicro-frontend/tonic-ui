import { Flex, Text, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = colorStyle.background.secondary;
  const color = colorStyle.color.secondary;
  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Flex flexDirection="row" columnGap="6x">
      {['thin', 'medium', 'thick'].map(key => (
        <Flex
          key={key}
          width={256}
          height={128}
          backgroundColor={backgroundColor}
          color={color}
          boxShadow={colorStyle.shadow[key]}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="md" lineHeight="md">
            {capitalizeFirstLetter(key)}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default App;

import { Box, Flex, Text, useColorMode, useTheme } from '@tonic-ui/react';
import React from 'react';

const isColorCode = value => String(value).startsWith('#') || String(value).startsWith('rgb(') || String(value).startsWith('rgba(');

const App = () => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const cssVariableMap = theme.__cssVariableMap;
  const borderColor = {         
    dark: 'gray:60',
    light: 'gray:30',                                  
  }[colorMode]; 
  const tokenColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];

  return (
    <Box fontFamily="mono">
      {Object.entries(cssVariableMap).map(([name, value]) => {
        return (
          <Flex key={name} columnGap="2x">
            <Text color={tokenColor}>{name}:</Text>
            <Flex alignItems="center" columnGap="1x">
              {isColorCode(value) && (
                <Box backgroundColor={value} border={1} borderColor={borderColor} width="3x" height="3x" />
              )}
              <Text>{value};</Text>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};

export default App;

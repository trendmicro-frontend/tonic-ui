import {
  Box,
  Text,
  useColorMode,
} from '@tonic-ui/react';
import React from 'react';
import Header from '../components/Header';

const MainPage = (props) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize="sm"
      lineHeight="sm"
    >
      <Header
        position="sticky"
        top={0}
        zIndex="fixed"
      />
      <Box mt="12x">
        The React UI Library
        for creating web apps
        <Text>
          Tonic UI is a UI component library for React, built with Emotion and Styled System. It is designed to be easy to use and easy to customize.
        </Text>
      </Box>
    </Box>
  );
};

export default MainPage;

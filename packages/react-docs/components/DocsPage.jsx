import {
  Box,
  useColorMode,
} from '@tonic-ui/react';
import NextApp from 'next/app';
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

const DocsPage = (props) => {
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
      <Header />
      <Sidebar
        display={['none', null, 'block']}
        maxWidth="20rem"
      />
      <Box
        height="100vh"
        pt="12x"
      >
        <Main
          ml={[0, null, '20rem']}
        >
          <NextApp {...props} />
        </Main>
      </Box>
    </Box>
  );
};

export default DocsPage;

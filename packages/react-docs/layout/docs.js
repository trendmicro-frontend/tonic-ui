import {
  Box,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import NextApp from 'next/app';
import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import Content from '../components/Content';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

const DocsPage = (props) => {
  const matched = useMediaQuery(
    '(min-width: 640px)',
  );
  const [isSidebarVisible, toggleSidebar] = useToggle(matched ? true : false);
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const top = theme.sizes['12x'];
  const height = `calc(100vh - ${top})`;
  const handleCloseSidebar = () => {
    if (isSidebarVisible) {
      toggleSidebar(false);
    }
  };

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize="md"
      lineHeight="md"
    >
      <Header
        onToggle={() => {
          toggleSidebar();
        }}
      />
      <Main onClick={handleCloseSidebar}>
        <Box display="flex">
          <Sidebar
            flexShrink={0}
            width={{
              sm: isSidebarVisible ? 250 : 0,
              md: 250,
            }}
            willChange="width"
            transition="width .3s ease-in-out"
            height={height}
            overflowY="auto"
            overflowX="hidden"
            position={{
              sm: 'fixed',
              md: 'sticky',
            }}
            mt={{
              sm: 0,
              md: top,
            }}
            top={top}
            left={0}
            zIndex={{
              sm: 'fixed',
              md: 'base',
            }}
            onClick={handleCloseSidebar}
          />
          <Box pt={top} width="100%">
            <Content>
              <NextApp {...props} />
            </Content>
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default DocsPage;

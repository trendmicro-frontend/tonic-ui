import { Box, Flex, PseudoBox, useColorMode } from '@trendmicro/react-styled-core';
import React from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import TMIcon from './TMIcon';
import pkg from '../../../package.json';

const Header = React.forwardRef((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = {
    light: 'white', // FIXME
    dark: 'gray.90', // FIXME
  }[colorMode];
  const borderColor = {
    light: 'gray.20', // FIXME
    dark: 'gray.70', // FIXME
  }[colorMode];

  return (
    <Box
      position="fixed"
      top={0}
      height="4rem"
      width="100%"
      backgroundColor={backgroundColor}
      borderBottom={1}
      borderBottomColor={borderColor}
      {...props}
    >
      <Flex
        position="relative"
        height="100%"
        alignItems="center"
      >
        <Box
          flex="auto"
          fontSize="3xl"
          maxWidth="100%"
          px="1rem"
        >
          Trend Micro Styled System
        </Box>
        <Box
          flex="none"
          width="auto"
          px="1rem"
        >
          <PseudoBox
            as="a"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' && (
              <TMIcon name="moon" fontSize="2xl" />
            )}
            {colorMode === 'dark' && (
              <TMIcon name="sun" fontSize="2xl" />
            )}
          </PseudoBox>
          <Box
            display="inline-block"
            width="1rem"
          />
          <PseudoBox
            as="a"
            _hover={{
              cursor: 'pointer',
            }}
            href={pkg.homepage}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={['fab', 'github']}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </PseudoBox>
        </Box>
      </Flex>
    </Box>
  );
});

export default Header;

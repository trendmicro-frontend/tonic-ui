import { Box, Flex, PseudoBox, Icon, Image, Text, useColorMode } from '@trendmicro/react-styled-ui';
import React from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import pkg from '../../../package.json';

const Header = React.forwardRef((props, ref) => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () => {
    const nextColorMode = {
      'dark': 'light',
      'light': 'dark',
    }[colorMode];
    setColorMode(nextColorMode);
  };
  const logoPath = {
    light: 'images/tonic-logo-light.svg',
    dark: 'images/tonic-logo-dark.svg',
  }[colorMode];
  const backgroundColor = {
    light: 'white:emphasis', // FIXME
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70',
  }[colorMode];
  const fontColor = {
    light: 'black:primary', // FIXME
    dark: 'white:emphasis',
  }[colorMode];

  return (
    <Box
      position="fixed"
      top={0}
      height="12x"
      width="100%"
      zIndex="fixed"
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
          display="flex"
          alignItems="center"
          flex="auto"
          fontSize="xl"
          maxWidth="100%"
          px="4x"
          py="2x"
          color={fontColor}
        >
          <Image
            src={logoPath}
            width={35}
            height={30}
            marginRight="2x"
          />
          <Text>Tonic Styled UI</Text>
        </Box>
        <Flex
          flex="none"
          width="auto"
          align="center"
          px="4x"
        >
          <PseudoBox
            as="a"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={toggleColorMode}
            display="inline-flex"
          >
            {colorMode === 'light' && (
              <Icon icon="moon" size={24} />
            )}
            {colorMode === 'dark' && (
              <Icon icon="sun" size={24} />
            )}
          </PseudoBox>
          <Box
            display="inline-block"
            width="5x"
          />
          <PseudoBox
            as="a"
            _hover={{
              cursor: 'pointer',
            }}
            href={pkg.homepage}
            target="_blank"
            display="inline-flex"
          >
            <FontAwesomeIcon
              icon={['fab', 'github']}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </PseudoBox>
        </Flex>
      </Flex>
    </Box>
  );
});

export default Header;

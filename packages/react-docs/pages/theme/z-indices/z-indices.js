import { Box, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box position="relative" py="3x" px="4x" height={360}>
      {['dropdown', 'sticky', 'fixed', 'overlay', 'drawer', 'modal', 'popover', 'toast', 'tooltip'].map((name, index) => {
        const zIndexValue = 1000 + index * 100;

        return (
          <Box
            key={name}
            backgroundColor={colorStyle.background.secondary}
            boxShadow={colorStyle.shadow.thin}
            color={colorStyle.color.secondary}
            position="absolute"
            top={12 + index * 36}
            left={12 + index * 16}
            zIndex={name}
            width={150}
            px="4x"
            py="3x"
            textAlign="center"
            transition="transform 0.2s ease-in-out"
            _hover={{
              color: colorStyle.color.primary,
              transform: 'scale(1.1)',
            }}
          >
            {name}={zIndexValue}
          </Box>
        );
      })}
    </Box>
  );
};

export default App;

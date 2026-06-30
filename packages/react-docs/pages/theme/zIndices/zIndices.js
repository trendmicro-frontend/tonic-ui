import { Box } from '@tonic-ui/react';

const App = () => {
  return (
    <Box position="relative" py="3x" px="4x" height={360}>
      {['dropdown', 'sticky', 'fixed', 'overlay', 'drawer', 'modal', 'popover', 'toast', 'tooltip'].map((name, index) => {
        const zIndexValue = 1000 + index * 100;

        return (
          <Box
            key={name}
            backgroundColor="background.high"
            border={1}
            borderColor="border.tertiary"
            boxShadow="down.high"
            color="text.secondary"
            position="absolute"
            top={12 + index * 36}
            left={12 + index * 16}
            zIndex={zIndexValue}
            width={150}
            px="4x"
            py="3x"
            textAlign="center"
            transition="transform 0.2s ease-in-out"
            willChange="transform"
            _hover={{
              color: 'text.primary',
              transform: 'scale(1.1)',
              zIndex: 9999,
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

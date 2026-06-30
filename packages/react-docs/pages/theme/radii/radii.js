import { Flex, Stack } from '@tonic-ui/react';

const App = () => {
  const styleProps = {
    border: 1,
    borderColor: 'border.secondary',
    backgroundColor: 'background.high',
    color: 'text.secondary',
    width: '18x',
    height: '18x',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Stack
      display="inline-flex"
      spacing="6x"
    >
      <Flex
        gap="4x"
      >
        <Flex
          {...styleProps}
          borderRadius="xs"
        >
          xs
        </Flex>
        <Flex
          {...styleProps}
          borderRadius="sm"
        >
          sm
        </Flex>
        <Flex
          {...styleProps}
          borderRadius="md"
        >
          md
        </Flex>
        <Flex
          {...styleProps}
          borderRadius="lg"
        >
          lg
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        gap="4x"
      >
        <Flex
          {...styleProps}
          borderRadius="50%"
        >
          50%
        </Flex>
        <Flex
          {...styleProps}
          borderRadius="calc(infinity * 1px)"
          height="8x"
          flex="auto"
        >
          calc(infinity * 1px)
        </Flex>
      </Flex>
    </Stack>
  );
};

export default App;

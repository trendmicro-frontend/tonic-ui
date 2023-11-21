import { Badge, Box, Button, ButtonGroup, Flex, Icon, Space, Stack, Switch, Text, TextLabel } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(1);
  const [isInvisible, setIsInvisible] = useState(false);

  return (
    <Stack mt="1x" direction="column" spacing="8x">
      <Flex alignItems="center">
        <Box mr="8x">
          <Badge badgeContent={count} isInvisible={!(count > 0)}>
            <Icon icon="alert" />
          </Badge>
        </Box>
        <ButtonGroup
          variant="secondary"
        >
          <Button
            aria-label="decrease"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <Icon icon="minus" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(Math.max(count + 1, 0));
            }}
          >
            <Icon icon="add" />
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex alignItems="center">
        <Box mr="8x">
          <Badge
            variant="dot"
            isInvisible={isInvisible}
          >
            <Icon icon="alert" />
          </Badge>
        </Box>
        <TextLabel cursor="pointer">
          <Flex alignItems="center">
            <Switch
              size="md"
              checked={!isInvisible}
              onChange={() => {
                setIsInvisible(!isInvisible);
              }}
            />
            <Space width="2x" />
            <Text userSelect="none">Show Badge</Text>
          </Flex>
        </TextLabel>
      </Flex>
    </Stack>
  );
};

export default App;

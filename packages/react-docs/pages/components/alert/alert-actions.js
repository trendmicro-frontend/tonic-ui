import { Alert, Button, Flex, LinkButton, Stack, Text } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const ActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    variant="secondary"
    borderColor="black:primary"
    color="black:primary"
    sx={{
      ':active': {
        color: 'black:primary',
      },
      ':focus': {
        color: 'black:primary',
      },
      ':hover': {
        background: 'rgba(0, 0, 0, 0.12)',
        color: 'black:primary',
      },
      ':hover:not(:focus)': {
        boxShadow: 'none',
      },
    }}
    {...props}
  />
));
ActionButton.displayName = 'ActionButton';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert variant="solid" severity="warning">
      <Flex justifyContent="space-between">
        <Text>This is a warning alert.</Text>
        <LinkButton>Learn More</LinkButton>
      </Flex>
    </Alert>
    <Alert variant="solid" severity="error">
      <Flex justifyContent="space-between" mt={-1} mb={-2}>
        <Text>This is an error alert.</Text>
        <ActionButton
          // See above for the ActionButton component
          size="sm"
        >
          Action Button
        </ActionButton>
      </Flex>
    </Alert>
    <Alert variant="outline" severity="warning">
      <Flex justifyContent="space-between">
        <Text>This is a warning alert.</Text>
        <LinkButton>Learn More</LinkButton>
      </Flex>
    </Alert>
    <Alert variant="outline" severity="error">
      <Flex justifyContent="space-between" mt={-1} mb={-2}>
        <Text>This is an error alert.</Text>
        <Button size="sm" variant="secondary">
          Action Button
        </Button>
      </Flex>
    </Alert>
  </Stack>
);

export default App;

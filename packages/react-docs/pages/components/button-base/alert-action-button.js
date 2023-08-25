import {
  Alert,
  Button,
  Flex,
  Text,
} from '@tonic-ui/react';
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

const App = () => {
  return (
    <Alert variant="solid" severity="error" isClosable>
      <Flex justifyContent="space-between">
        <Text>
          This is an alert notification with an action button.
        </Text>
        <ActionButton size="sm">
          Action Button
        </ActionButton>
      </Flex>
    </Alert>
  );
};

export default App;

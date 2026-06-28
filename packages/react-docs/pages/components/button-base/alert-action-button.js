import {
  Alert,
  Button,
  Flex,
  Text,
} from '@tonic-ui/react';
import { forwardRef } from 'react';

const ActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    variant="secondary"
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

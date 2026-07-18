import { Alert, Button, Flex, LinkButton, Stack, Text } from '@tonic-ui/react';

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
        <Button size="sm" variant="secondary">
          Action Button
        </Button>
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

import { Flex, Switch } from '@tonic-ui/react';

const App = () => {
  return (
    <Flex columnGap="6x">
      <Switch variantColor="red" defaultChecked>
        Label
      </Switch>
      <Switch variantColor="green" defaultChecked>
        Label
      </Switch>
    </Flex>
  );
};

export default App;

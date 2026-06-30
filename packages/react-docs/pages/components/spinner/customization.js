import { Flex, Spinner } from '@tonic-ui/react';

const App = () => {
  const trackColor = 'border.tertiary';

  return (
    <Flex alignItems="center" columnGap="6x">
      <Spinner lineColor="transparent" />
      <Spinner lineColor="red.500" trackColor="transparent" />
      <Spinner lineColor="red.500" lineWidth={6} trackColor={trackColor} trackWidth={6} />
    </Flex>
  );
};

export default App;

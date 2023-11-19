import { Flex, Spinner, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const trackColor = colorStyle.divider;

  return (
    <Flex alignItems="center" columnGap="6x">
      <Spinner lineColor="transparent" />
      <Spinner lineColor="red:50" trackColor="transparent" />
      <Spinner lineColor="red:50" lineWidth={6} trackColor={trackColor} trackWidth={6} />
    </Flex>
  );
};

export default App;

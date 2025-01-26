import { Flex, Spinner, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();

  return (
    <Flex alignItems="center" columnGap="6x">
      <Spinner color="transparent" />
      <Spinner color="red:50" trackColor={colorStyle.background.secondary} />
      <Spinner color="red:50" trackColor="transparent" />
    </Flex>
  );
};

export default App;

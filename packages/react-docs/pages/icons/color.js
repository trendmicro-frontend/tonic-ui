import React from 'react';
import { Flex, useColorStyle } from '@tonic-ui/react';
import {
  HomeIcon,
} from '@tonic-ui/react-icons';

const App = () => {
  const [colorStyle] = useColorStyle();
  return (
    <Flex alignItems="center" columnGap="6x">
      <HomeIcon color={colorStyle.color.primary} />
      <HomeIcon color={colorStyle.color.secondary} />
      <HomeIcon color={colorStyle.color.tertiary} />
      <HomeIcon color={colorStyle.color.disabled} />
      <HomeIcon color="yellow:50" />
    </Flex>
  );
};

export default App;

import React from 'react';
import { useColorStyle } from '@tonic-ui/react';
import {
  HomeIcon,
} from '@tonic-ui/react-icons';

const App = () => {
  const [colorStyle] = useColorStyle();
  return (
    <>
      <HomeIcon color={colorStyle.color.secondary} size="4x" />
    </>
  );
};

export default App;

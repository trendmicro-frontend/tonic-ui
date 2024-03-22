import { useColorStyle } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();
  return (
    <SVGIcon color={colorStyle.color.secondary} size="4x">
      <svg viewBox="0 0 16 16">
        <path d="M15 8c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3.866 3.134-7 7-7v0c3.866 0 7 3.134 7 7v0z" />
      </svg>
    </SVGIcon>
  );
};

export default App;

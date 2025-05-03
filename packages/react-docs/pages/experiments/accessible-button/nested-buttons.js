import {
  Button,
  Space,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';
import { AccessibleButton } from '@/experiments/accessible-button';

const App = () => {
  const [colorStyle] = useColorStyle();

  return (
    <AccessibleButton
      border={1}
      borderColor={colorStyle.divider}
      px="4x"
      py="3x"
      alignItems="center"
      onClick={() => {
        console.log('Clicked AccessibleButton');
      }}
    >
      AccessibleButton
      <Space width="4x" />
      <Button
        variant="secondary"
        onClick={() => {
          console.log('Clicked Button');
        }}
      >
        Button
      </Button>
    </AccessibleButton>
  );
};

export default App;

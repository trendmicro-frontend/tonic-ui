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
      alignItems="center"
      border={1}
      borderColor="transparent"
      _hover={{
        borderColor: colorStyle.color.disabled,
      }}
      borderRadius="sm"
      px="4x"
      py="3x"
      transition="border-color 200ms"
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

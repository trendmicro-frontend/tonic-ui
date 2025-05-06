import {
  Button,
  Space,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';
import { createVariantButtonBox } from './utils';

const SecondaryButtonBox = createVariantButtonBox('secondary');

const App = () => {
  const [colorStyle] = useColorStyle();

  return (
    <SecondaryButtonBox
      border={1}
      borderColor="transparent"
      _hover={{
        borderColor: colorStyle.color.disabled,
      }}
      borderRadius="sm"
      px="4x"
      py="3x"
      transition="border-color 200ms"
      onClick={(event) => {
        console.log('Clicked ButtonBox:', event);
      }}
    >
      ButtonBox
      <Space width="4x" />
      <Button
        variant="secondary"
        onClick={(event) => {
          console.log('Clicked Button:', event);
        }}
      >
        Button
      </Button>
    </SecondaryButtonBox>
  );
};

export default App;

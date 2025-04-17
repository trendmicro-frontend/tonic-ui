import { Box, Button, ButtonGroup, Divider, TextLabel } from '@tonic-ui/react';
import FormGroup from '@/components/FormGroup';
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import React, { useState } from 'react';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [variant, changeVariantBy] = useSelection('unordered');

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            variant
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['unordered', 'ordered'].map(value => (
            <Button
              key={value}
              selected={value === variant}
              onClick={changeVariantBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider my="4x" />
      <List variant={variant}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    </>
  );
};

export default App;

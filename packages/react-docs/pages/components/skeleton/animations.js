import { Box, Button, ButtonGroup, Divider, Skeleton, Stack, TextLabel } from '@tonic-ui/react';
import React from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [animation, changeAnimationBy] = useSelection('none');

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            animation
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
          {['none', 'pulse', 'wave'].map(value => (
            <Button
              key={value}
              selected={value === animation}
              onClick={changeAnimationBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider my="4x" />
      <Stack direction="column" spacing="4x">
        <Skeleton animation={animation} width={160} />
        <Skeleton animation={animation} width={240} />
        <Skeleton animation={animation} width={240} />
      </Stack>
    </>
  );
};

export default App;

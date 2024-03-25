import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  InputGroup,
  InputGroupAppend,
  InputGroupPrepend,
  Space,
  Stack,
  useColorMode,
} from '@tonic-ui/react';
import { AngleDownIcon, SettingsIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const dividerColor ={
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return (
    <Stack direction="column" spacing="4x">
      <InputGroup>
        <InputGroupPrepend>
          <Button variant="secondary">
            Action
          </Button>
        </InputGroupPrepend>
        <Input />
      </InputGroup>
      <InputGroup>
        <Input />
        <InputGroupAppend>
          <Button variant="secondary">
            Action
          </Button>
        </InputGroupAppend>
      </InputGroup>
      <InputGroup>
        <InputGroupPrepend>
          <Button variant="secondary">
            Host name
            <Space width="1x" />
            <AngleDownIcon />
          </Button>
        </InputGroupPrepend>
        <Input />
        <InputGroupAppend>
          <Button>
            Action
          </Button>
        </InputGroupAppend>
      </InputGroup>
      <InputGroup>
        <Input />
        <ButtonGroup>
          <Button borderRadius={0}>
            Action
          </Button>
          <Divider orientation="vertical" color={dividerColor} />
          <Button>
            <SettingsIcon />
          </Button>
        </ButtonGroup>
      </InputGroup>
    </Stack>
  );
};

export default App;

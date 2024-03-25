import { Button, Flex } from '@tonic-ui/react';
import { AddIcon, AngleRightIcon, SettingsIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Flex direction="column" rowGap="4x">
    <Flex columnGap="4x">
      <Button variant="primary" width="8x" height="8x" borderRadius="circle">
        <AddIcon />
      </Button>
      <Button variant="primary" width="8x" height="8x">
        <AddIcon />
      </Button>
      <Button variant="primary" borderRadius="2rem" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="primary" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="primary" borderRadius="2rem" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
      <Button variant="primary" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button width="8x" height="8x" borderRadius="circle">
        <AddIcon />
      </Button>
      <Button width="8x" height="8x">
        <AddIcon />
      </Button>
      <Button borderRadius="2rem"  columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button borderRadius="2rem" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
      <Button columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button variant="secondary" width="8x" height="8x" borderRadius="circle">
        <AddIcon />
      </Button>
      <Button variant="secondary" width="8x" height="8x">
        <AddIcon />
      </Button>
      <Button variant="secondary" borderRadius="2rem" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="secondary" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="secondary" borderRadius="2rem" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
      <Button variant="secondary" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button variant="ghost" width="8x" height="8x" borderRadius="circle">
        <AddIcon />
      </Button>
      <Button variant="ghost" width="8x" height="8x">
        <AddIcon />
      </Button>
      <Button variant="ghost" borderRadius="2rem" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="ghost" columnGap="2x">
        <SettingsIcon />
        Settings
      </Button>
      <Button variant="ghost" borderRadius="2rem" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
      <Button variant="ghost" columnGap="2x">
        Next
        <AngleRightIcon />
      </Button>
    </Flex>
  </Flex>
);

export default App;

import {
  Button,
  Flex,
  Icon,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex direction="column" rowGap="4x">
    <Flex columnGap="4x">
      <Button variant="primary" width="8x" height="8x" borderRadius="circle">
        <Icon icon="add" />
      </Button>
      <Button variant="primary" width="8x" height="8x">
        <Icon icon="add" />
      </Button>
      <Button variant="primary" borderRadius="2rem" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="primary" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="primary" borderRadius="2rem" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
      <Button variant="primary" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button width="8x" height="8x" borderRadius="circle">
        <Icon icon="add" />
      </Button>
      <Button width="8x" height="8x">
        <Icon icon="add" />
      </Button>
      <Button borderRadius="2rem"  columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button borderRadius="2rem" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
      <Button columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button variant="secondary" width="8x" height="8x" borderRadius="circle">
        <Icon icon="add" />
      </Button>
      <Button variant="secondary" width="8x" height="8x">
        <Icon icon="add" />
      </Button>
      <Button variant="secondary" borderRadius="2rem" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="secondary" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="secondary" borderRadius="2rem" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
      <Button variant="secondary" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
    </Flex>
    <Flex columnGap="4x">
      <Button variant="ghost" width="8x" height="8x" borderRadius="circle">
        <Icon icon="add" />
      </Button>
      <Button variant="ghost" width="8x" height="8x">
        <Icon icon="add" />
      </Button>
      <Button variant="ghost" borderRadius="2rem" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="ghost" columnGap="2x">
        <Icon icon="settings" />
        Settings
      </Button>
      <Button variant="ghost" borderRadius="2rem" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
      <Button variant="ghost" columnGap="2x">
        Next
        <Icon icon="angle-right" />
      </Button>
    </Flex>
  </Flex>
);

export default App;

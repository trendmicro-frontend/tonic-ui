import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TextLabel,
} from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [orientation, setOrientation] = useState('horizontal');
  const [variant, setVariant] = useState('default');

  return (
    <>
      <Box mb="4x">
        <Box mb="2x">
          <TextLabel>
            orientation
          </TextLabel>
        </Box>
        <ButtonGroup>
          <Button
            onClick={() => setOrientation('horizontal')}
            variant={orientation === 'horizontal' ? 'primary' : 'secondary'}
          >
            horizontal
          </Button>
          <Button
            onClick={() => setOrientation('vertical')}
            variant={orientation === 'vertical' ? 'primary' : 'secondary'}
          >
            vertical
          </Button>
        </ButtonGroup>
      </Box>
      <Box mb="4x">
        <Box mb="2x">
          <TextLabel>
            variant
          </TextLabel>
        </Box>
        <ButtonGroup>
          <Button
            onClick={() => setVariant('default')}
            variant={variant === 'default' ? 'primary' : 'secondary'}
          >
            default
          </Button>
          <Button
            onClick={() => setVariant('filled')}
            variant={variant === 'filled' ? 'primary' : 'secondary'}
          >
            filled
          </Button>
          <Button
            onClick={() => setVariant('unstyled')}
            variant={variant === 'unstyled' ? 'primary' : 'secondary'}
          >
            unstyled
          </Button>
        </ButtonGroup>
      </Box>
      <Divider mb="4x" />
      <Tabs
        orientation={orientation}
        variant={variant}
      >
        <TabList>
          <Tab>TAB 1</Tab>
          <Tab>TAB 2</Tab>
          <Tab>TAB 3</Tab>
        </TabList>
        <TabPanels px="3x" py="2x">
          <TabPanel>
            Tab Panel 1
          </TabPanel>
          <TabPanel>
            Tab Panel 2
          </TabPanel>
          <TabPanel>
            Tab Panel 3
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default App;

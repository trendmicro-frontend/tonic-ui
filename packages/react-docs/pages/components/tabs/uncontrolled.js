import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tabs defaultIndex={0}>
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
  );
};

export default App;

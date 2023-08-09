import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [index, setIndex] = useState('tab1');

  return (
    <Tabs
      index={index}
      onChange={index => setIndex(index)}
    >
      <TabList>
        <Tab index="tab1">TAB 1</Tab>
        <Tab index="tab2">TAB 2</Tab>
        <Tab index="tab3">TAB 3</Tab>
      </TabList>
      <TabPanels px="3x" py="2x">
        <TabPanel index="tab1">
          Tab Panel 1
        </TabPanel>
        <TabPanel index="tab2">
          Tab Panel 2
        </TabPanel>
        <TabPanel index="tab3">
          Tab Panel 3
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default App;

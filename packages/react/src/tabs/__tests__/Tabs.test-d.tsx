import React, { createRef, useState } from 'react';
import { Box, Tabs, Tab, TabList, TabPanel, TabPanels } from '@tonic-ui/react';

// Basic usage
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Panel 1</TabPanel>
    <TabPanel>Panel 2</TabPanel>
  </TabPanels>
</Tabs>;

// With defaultIndex (uncontrolled)
<Tabs defaultIndex={1}>
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// With index and onChange (controlled) - no manual type annotation
<Tabs
  index={0}
  onChange={(index) => console.log(index)}
>
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// With orientation
<Tabs orientation="horizontal">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

<Tabs orientation="vertical">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// With variant
<Tabs variant="default">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

<Tabs variant="filled">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

<Tabs variant="unstyled">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// With disabled
<Tabs disabled>
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// With render prop (no manual type annotation)
<Tabs>
  {({ index, orientation, variant }) => (
    <>
      <Box mb="2x">TAB {index} is selected</Box>
      <TabList><Tab>Tab 1</Tab></TabList>
      <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
    </>
  )}
</Tabs>;

// With string index
<Tabs defaultIndex="tab-1">
  <TabList>
    <Tab index="tab-1">Tab 1</Tab>
    <Tab index="tab-2">Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index="tab-1">Panel 1</TabPanel>
    <TabPanel index="tab-2">Panel 2</TabPanel>
  </TabPanels>
</Tabs>;

// StyleProps
<Tabs padding="4x" margin="2x">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// Ref
const tabsRef = createRef<HTMLDivElement>();
<Tabs ref={tabsRef}>
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Tabs ref={wrongRef}>
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// Controlled with numeric useState — pass setter directly
function NumericTabExample() {
  const [drawerTabIndex, setDrawerTabIndex] = useState(0);
  return (
    <Tabs index={drawerTabIndex} onChange={setDrawerTabIndex}>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel>Panel 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// Controlled with string useState — pass setter directly
function StringTabExample() {
  const [tab, setTab] = useState('details');
  return (
    <Tabs index={tab} onChange={setTab}>
      <TabList>
        <Tab index="details">Details</Tab>
        <Tab index="configurations">Configurations</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index="details">Details panel</TabPanel>
        <TabPanel index="configurations">Configurations panel</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// Controlled with string useState — inline callback
function StringTabInlineExample() {
  const [tab, setTab] = useState('details');
  return (
    <Tabs index={tab} onChange={(index) => setTab(index)}>
      <TabList>
        <Tab index="details">Details</Tab>
        <Tab index="configurations">Configurations</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index="details">Details panel</TabPanel>
        <TabPanel index="configurations">Configurations panel</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// Negative tests
// @ts-expect-error - 'outlined' is not a valid variant
<Tabs variant="outlined">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

// @ts-expect-error - 'diagonal' is not a valid orientation
<Tabs orientation="diagonal">
  <TabList><Tab>Tab 1</Tab></TabList>
  <TabPanels><TabPanel>Panel 1</TabPanel></TabPanels>
</Tabs>;

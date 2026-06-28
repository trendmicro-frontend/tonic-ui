import React, { createRef } from 'react';
import { TabPanel, TabPanels } from '@tonic-ui/react';

// Basic usage
<TabPanels>
  <TabPanel>Panel 1</TabPanel>
  <TabPanel>Panel 2</TabPanel>
</TabPanels>;

// Ref
const tabPanelsRef = createRef<HTMLDivElement>();
<TabPanels ref={tabPanelsRef}>
  <TabPanel>Panel</TabPanel>
</TabPanels>;

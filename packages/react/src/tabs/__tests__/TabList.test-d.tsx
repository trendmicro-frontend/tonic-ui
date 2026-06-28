import React, { createRef } from 'react';
import { Tab, TabList } from '@tonic-ui/react';

// Basic usage
<TabList>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
</TabList>;

// Ref
const tabListRef = createRef<HTMLDivElement>();
<TabList ref={tabListRef}>
  <Tab>Tab</Tab>
</TabList>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<TabList ref={wrongRef}>
  <Tab>Tab</Tab>
</TabList>;

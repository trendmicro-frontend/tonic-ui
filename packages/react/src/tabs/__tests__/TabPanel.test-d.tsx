import React, { createRef } from 'react';
import { TabPanel } from '@tonic-ui/react';

// Basic usage
<TabPanel>Panel Content</TabPanel>;

// With render prop (no manual type annotation)
<TabPanel>
  {({ getTabPanelProps, index, isSelected }) => (
    <div {...getTabPanelProps()}>
      Custom Panel {index}
    </div>
  )}
</TabPanel>;

// Ref
const tabPanelRef = createRef<HTMLDivElement>();
<TabPanel ref={tabPanelRef}>Panel</TabPanel>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<TabPanel ref={wrongRef}>Panel</TabPanel>;

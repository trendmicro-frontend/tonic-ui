import React, { createRef } from 'react';
import { Tab } from '@tonic-ui/react';

// Basic usage
<Tab>Tab Content</Tab>;

// With disabled
<Tab disabled>Disabled Tab</Tab>;

// With onClick (no manual type annotation)
<Tab onClick={(e) => console.log(e.currentTarget)}>Clickable Tab</Tab>;

// With render prop (no manual type annotation)
<Tab>
  {({ getTabProps, disabled, index, isSelected }) => (
    <button type="submit" {...getTabProps()}>
      Custom Tab {index} {isSelected ? '(Active)' : null}
    </button>
  )}
</Tab>;

// With string index
<Tab index="custom-tab-id">String Index Tab</Tab>;

// Ref
const tabRef = createRef<HTMLButtonElement>();
<Tab ref={tabRef}>Tab</Tab>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLButtonElement
<Tab ref={wrongRef}>Tab</Tab>;

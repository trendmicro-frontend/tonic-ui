import React, { createRef } from 'react';
import { MenuItem, SubmenuToggle } from '@tonic-ui/react';

// Basic usage (deprecated, use SubmenuTrigger)
<SubmenuToggle>
  <MenuItem>Submenu Item</MenuItem>
</SubmenuToggle>;

// Ref
const submenuToggleRef = createRef<HTMLDivElement>();
<SubmenuToggle ref={submenuToggleRef}>
  <MenuItem>Submenu</MenuItem>
</SubmenuToggle>;

// With render prop (children as function) - NO manual type annotations
<SubmenuToggle>
  {({ getSubmenuToggleProps }) => (
    <div {...getSubmenuToggleProps()}>
      <MenuItem>Custom Submenu Toggle</MenuItem>
    </div>
  )}
</SubmenuToggle>;

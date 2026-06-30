import React, { createRef } from 'react';
import { MenuGroup, MenuItem } from '@tonic-ui/react';

// === MenuGroup ===
<MenuGroup title="Group Title">
  <MenuItem>Item 1</MenuItem>
  <MenuItem>Item 2</MenuItem>
</MenuGroup>;

// StyleProps
<MenuGroup title="Styled Group" padding="3x" margin="2x">
  <MenuItem>Item</MenuItem>
</MenuGroup>;

// Ref
const groupRef = createRef<HTMLDivElement>();
<MenuGroup ref={groupRef} title="Group">
  <MenuItem>Item</MenuItem>
</MenuGroup>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuGroup
<MenuGroup ref={wrongRef} title="Group">
  <MenuItem>Item</MenuItem>
</MenuGroup>;

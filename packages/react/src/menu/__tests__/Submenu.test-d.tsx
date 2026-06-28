import React, { createRef } from 'react';
import { MenuButton, MenuItem, Submenu, SubmenuList } from '@tonic-ui/react';

// === Submenu ===
<Submenu>
  <MenuButton>Submenu</MenuButton>
  <SubmenuList>
    <MenuItem>Sub Item 1</MenuItem>
    <MenuItem>Sub Item 2</MenuItem>
  </SubmenuList>
</Submenu>;

// StyleProps
<Submenu padding="2x" margin="1x">
  <MenuButton>Styled Submenu</MenuButton>
  <SubmenuList>
    <MenuItem>Item</MenuItem>
  </SubmenuList>
</Submenu>;

// Ref
const submenuRef = createRef<HTMLDivElement>();
<Submenu ref={submenuRef}>
  <MenuButton>Submenu</MenuButton>
  <SubmenuList>
    <MenuItem>Item</MenuItem>
  </SubmenuList>
</Submenu>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Submenu
<Submenu ref={wrongRef}>
  <MenuButton>Submenu</MenuButton>
  <SubmenuList>
    <MenuItem>Item</MenuItem>
  </SubmenuList>
</Submenu>;

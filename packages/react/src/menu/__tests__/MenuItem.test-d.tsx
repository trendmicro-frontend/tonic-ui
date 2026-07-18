import React, { createRef } from 'react';
import { MenuItem } from '@tonic-ui/react';

// === MenuItem ===
<MenuItem>Menu Item</MenuItem>;

// With disabled
<MenuItem disabled>Disabled Item</MenuItem>;
<MenuItem disabled={false}>Enabled Item</MenuItem>;

// With onClick
<MenuItem onClick={() => console.log('clicked')}>Clickable</MenuItem>;

// With onKeyDown
<MenuItem onKeyDown={(e) => console.log(e.key)}>
  MenuItem with onKeyDown
</MenuItem>;

// StyleProps
<MenuItem padding="2x" margin="1x" color="blue:60">
  Styled Item
</MenuItem>;

// Ref
const menuItemRef = createRef<HTMLButtonElement>();
<MenuItem ref={menuItemRef}>Item</MenuItem>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuItem
<MenuItem ref={wrongRef}>Item</MenuItem>;

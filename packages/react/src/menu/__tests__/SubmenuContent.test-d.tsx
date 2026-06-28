import React from 'react';
import { MenuItem, SubmenuContent } from '@tonic-ui/react';

// === SubmenuContent ===
<SubmenuContent>
  <MenuItem>Item</MenuItem>
</SubmenuContent>;

// With multiple items
<SubmenuContent>
  <MenuItem>Item 1</MenuItem>
  <MenuItem>Item 2</MenuItem>
</SubmenuContent>;

// StyleProps
<SubmenuContent padding="3x" backgroundColor="gray:10">
  <MenuItem>Item</MenuItem>
</SubmenuContent>;

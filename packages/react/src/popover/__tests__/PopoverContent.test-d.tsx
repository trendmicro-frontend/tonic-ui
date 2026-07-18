import React from 'react';
import { PopoverContent } from '@tonic-ui/react';

// === PopoverContent ===
<PopoverContent>Content here</PopoverContent>;

// With children
<PopoverContent>
  <div>Multiple children</div>
  <div>More content</div>
</PopoverContent>;

// StyleProps
<PopoverContent padding="4x" margin="2x" backgroundColor="white:emphasis">
  Styled content
</PopoverContent>;

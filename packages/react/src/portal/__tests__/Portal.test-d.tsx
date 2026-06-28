import React from 'react';
import { Portal } from '@tonic-ui/react';

// === Portal ===
<Portal>
  <div>Portaled content</div>
</Portal>;

// With containerRef
const containerRef = { current: document.body };
<Portal containerRef={containerRef}>
  <div>Content</div>
</Portal>;

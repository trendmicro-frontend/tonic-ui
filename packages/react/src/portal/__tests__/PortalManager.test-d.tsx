import React, { createRef } from 'react';
import { PortalManager } from '@tonic-ui/react';

// === PortalManager ===
<PortalManager>
  <div>Content</div>
</PortalManager>;

// With containerRef
const containerRef = createRef<HTMLElement>();
<PortalManager containerRef={containerRef}>
  <div>Content</div>
</PortalManager>;

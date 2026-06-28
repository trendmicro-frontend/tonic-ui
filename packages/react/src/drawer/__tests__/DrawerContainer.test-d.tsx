import React, { createRef } from 'react';
import { DrawerContainer, DrawerContent } from '@tonic-ui/react';

// Basic usage with children
<DrawerContainer>
  <DrawerContent>Content</DrawerContent>
</DrawerContainer>;

// Ref - HTMLDivElement
const containerRef = createRef<HTMLDivElement>();
<DrawerContainer ref={containerRef}>
  <DrawerContent>Content</DrawerContent>
</DrawerContainer>;

// StyleProps
<DrawerContainer padding="4x">
  <DrawerContent>Content</DrawerContent>
</DrawerContainer>;

<DrawerContainer backgroundColor="white">
  <DrawerContent>Content</DrawerContent>
</DrawerContainer>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<DrawerContainer ref={createRef<SVGSVGElement>()}>
  <DrawerContent>Content</DrawerContent>
</DrawerContainer>;

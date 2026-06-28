import React, { createRef } from 'react';
import { DrawerContent } from '@tonic-ui/react';

// Basic usage with children
<DrawerContent>Drawer content here</DrawerContent>;

// Ref - HTMLDivElement
const contentRef = createRef<HTMLDivElement>();
<DrawerContent ref={contentRef}>Content</DrawerContent>;

// StyleProps
<DrawerContent padding="4x">Content</DrawerContent>;

<DrawerContent backgroundColor="white" borderRadius="md">
  Content
</DrawerContent>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<DrawerContent ref={createRef<SVGSVGElement>()}>Content</DrawerContent>;

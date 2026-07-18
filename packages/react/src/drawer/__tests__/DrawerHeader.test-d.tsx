import React, { createRef } from 'react';
import { DrawerHeader } from '@tonic-ui/react';

// Basic usage with children
<DrawerHeader>Drawer Title</DrawerHeader>;

// Ref - HTMLDivElement
const headerRef = createRef<HTMLDivElement>();
<DrawerHeader ref={headerRef}>Header</DrawerHeader>;

// StyleProps
<DrawerHeader padding="4x">Header</DrawerHeader>;

<DrawerHeader fontSize="xl" fontWeight="bold">
  Header
</DrawerHeader>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<DrawerHeader ref={createRef<SVGSVGElement>()}>Header</DrawerHeader>;

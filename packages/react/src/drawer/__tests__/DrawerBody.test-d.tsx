import React, { createRef } from 'react';
import { DrawerBody } from '@tonic-ui/react';

// Basic usage with children
<DrawerBody>Drawer body content</DrawerBody>;

// Ref - HTMLDivElement
const bodyRef = createRef<HTMLDivElement>();
<DrawerBody ref={bodyRef}>Body</DrawerBody>;

// StyleProps
<DrawerBody padding="4x">Body</DrawerBody>;

<DrawerBody overflow="auto" maxHeight="500px">
  Body
</DrawerBody>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<DrawerBody ref={createRef<SVGSVGElement>()}>Body</DrawerBody>;

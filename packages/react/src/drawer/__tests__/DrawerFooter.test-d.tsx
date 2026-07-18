import React, { createRef } from 'react';
import { DrawerFooter, Button } from '@tonic-ui/react';

// Basic usage with children
<DrawerFooter>
  <Button>Cancel</Button>
  <Button>Save</Button>
</DrawerFooter>;

// Ref - HTMLDivElement
const footerRef = createRef<HTMLDivElement>();
<DrawerFooter ref={footerRef}>Footer</DrawerFooter>;

// StyleProps
<DrawerFooter padding="4x">
  <Button>Cancel</Button>
</DrawerFooter>;

<DrawerFooter display="flex" justifyContent="flex-end">
  <Button>Save</Button>
</DrawerFooter>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<DrawerFooter ref={createRef<SVGSVGElement>()}>Footer</DrawerFooter>;

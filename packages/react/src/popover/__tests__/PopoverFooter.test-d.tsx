import React, { createRef } from 'react';
import { PopoverFooter, Button } from '@tonic-ui/react';

// === PopoverFooter ===
<PopoverFooter>
  <Button>Action</Button>
</PopoverFooter>;

// Ref
const footerRef = createRef<HTMLElement>();
<PopoverFooter ref={footerRef}>Footer</PopoverFooter>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to PopoverFooter
<PopoverFooter ref={wrongRef}>Wrong Ref</PopoverFooter>;

// StyleProps
<PopoverFooter padding="3x" borderTop={1} display="flex" justifyContent="flex-end">
  <Button size="sm">Cancel</Button>
  <Button size="sm" variant="primary">Confirm</Button>
</PopoverFooter>;

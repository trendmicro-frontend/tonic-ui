import React, { createRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@tonic-ui/react';

// === PopoverTrigger ===
<PopoverTrigger>
  <Button>Trigger</Button>
</PopoverTrigger>;

// Ref
const triggerRef = createRef<HTMLDivElement>();
<PopoverTrigger ref={triggerRef}>
  <Button>Trigger</Button>
</PopoverTrigger>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to PopoverTrigger
<PopoverTrigger ref={wrongRef}>
  <Button>Wrong Ref</Button>
</PopoverTrigger>;

// With render prop
<Popover>
  <PopoverTrigger>
    {({ getPopoverTriggerProps }) => (
      <Button {...getPopoverTriggerProps()}>Custom Trigger</Button>
    )}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

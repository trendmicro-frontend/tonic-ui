import React, { createRef } from 'react';
import { TooltipTrigger, Button } from '@tonic-ui/react';

// === TooltipTrigger ===
<TooltipTrigger>
  <Button>Trigger</Button>
</TooltipTrigger>;

// Ref
const triggerRef = createRef<HTMLDivElement>();
<TooltipTrigger ref={triggerRef}>
  <Button>Trigger</Button>
</TooltipTrigger>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to TooltipTrigger
<TooltipTrigger ref={wrongRef}>
  <Button>Trigger</Button>
</TooltipTrigger>;

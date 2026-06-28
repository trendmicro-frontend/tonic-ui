import React, { createRef } from 'react';
import { TooltipArrow } from '@tonic-ui/react';

// === TooltipArrow ===
<TooltipArrow />;

// Ref
const arrowRef = createRef<HTMLDivElement>();
<TooltipArrow ref={arrowRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to TooltipArrow
<TooltipArrow ref={wrongRef} />;

import React, { createRef } from 'react';
import { PopoverArrow } from '@tonic-ui/react';

// === PopoverArrow ===
<PopoverArrow />;

// Ref
const arrowRef = createRef<HTMLDivElement>();
<PopoverArrow ref={arrowRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to PopoverArrow
<PopoverArrow ref={wrongRef} />;

// StyleProps
<PopoverArrow borderColor="gray:60" />;

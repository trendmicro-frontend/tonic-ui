import React, { createRef } from 'react';
import { PopoverHeader } from '@tonic-ui/react';

// === PopoverHeader ===
<PopoverHeader>Header</PopoverHeader>;

// Ref
const headerRef = createRef<HTMLElement>();
<PopoverHeader ref={headerRef}>Header</PopoverHeader>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to PopoverHeader
<PopoverHeader ref={wrongRef}>Wrong Ref</PopoverHeader>;

// StyleProps
<PopoverHeader padding="3x" fontWeight="semibold" borderBottom={1}>
  Styled Header
</PopoverHeader>;

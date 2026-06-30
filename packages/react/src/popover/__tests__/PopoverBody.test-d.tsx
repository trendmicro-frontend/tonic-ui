import React, { createRef } from 'react';
import { PopoverBody } from '@tonic-ui/react';

// === PopoverBody ===
<PopoverBody>Body content</PopoverBody>;

// Ref
const bodyRef = createRef<HTMLDivElement>();
<PopoverBody ref={bodyRef}>Body</PopoverBody>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to PopoverBody
<PopoverBody ref={wrongRef}>Wrong Ref</PopoverBody>;

// StyleProps
<PopoverBody padding="4x" fontSize="sm" color="gray:primary">
  Styled body content
</PopoverBody>;

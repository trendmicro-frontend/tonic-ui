import React, { createRef } from 'react';
import { VisuallyHidden } from '@tonic-ui/react';

// === VisuallyHidden ===
<VisuallyHidden>Screen reader only content</VisuallyHidden>;

// StyleProps
<VisuallyHidden padding="2x">Styled</VisuallyHidden>;

// Ref
const hiddenRef = createRef<HTMLDivElement>();
<VisuallyHidden ref={hiddenRef}>Hidden</VisuallyHidden>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to VisuallyHidden
<VisuallyHidden ref={wrongRef}>Wrong ref</VisuallyHidden>;

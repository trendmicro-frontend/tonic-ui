import React, { createRef } from 'react';
import { Mark } from '@tonic-ui/react';

// === Mark ===
<Mark>Marked text</Mark>;

// With variant
<Mark variant="none">None</Mark>;
<Mark variant="emphasis">Emphasis</Mark>;
<Mark variant="highlight">Highlight</Mark>;

// StyleProps
<Mark padding="1x" backgroundColor="yellow:50">
  Styled mark
</Mark>;

// Ref
const markRef = createRef<HTMLElement>();
<Mark ref={markRef}>With ref</Mark>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Mark
<Mark ref={wrongRef}>Wrong ref</Mark>;

// === Negative tests ===
// @ts-expect-error - 'bold' is not a valid variant for Mark
<Mark variant="bold">Invalid</Mark>;

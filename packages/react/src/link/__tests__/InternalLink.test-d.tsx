import React, { createRef } from 'react';
import { InternalLink } from '@tonic-ui/react';

// === InternalLink ===
<InternalLink href="/">Internal Link</InternalLink>;

// With variant
<InternalLink href="/" variant="default">Default</InternalLink>;
<InternalLink href="/" variant="inline">Inline</InternalLink>;
<InternalLink href="/" variant="subtle">Subtle</InternalLink>;

// With disabled
<InternalLink href="/" disabled>Disabled</InternalLink>;

// With onClick
<InternalLink href="/" onClick={(e) => e.preventDefault()}>
  With Handler
</InternalLink>;

// StyleProps
<InternalLink href="/" padding="2x" color="blue:50">Styled</InternalLink>;

// Ref
const anchorRef = createRef<HTMLAnchorElement>();
<InternalLink ref={anchorRef} href="/">With Ref</InternalLink>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InternalLink
<InternalLink ref={wrongRef} href="/">Wrong Ref</InternalLink>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for InternalLink
<InternalLink href="/" variant="ghost">Invalid variant</InternalLink>;

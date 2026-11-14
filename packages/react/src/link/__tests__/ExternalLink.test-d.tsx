import React, { createRef } from 'react';
import { ExternalLink } from '@tonic-ui/react';

// === ExternalLink ===
<ExternalLink href="https://example.com">External Link</ExternalLink>;

// With variant
<ExternalLink href="https://example.com" variant="default">Default</ExternalLink>;
<ExternalLink href="https://example.com" variant="inline">Inline</ExternalLink>;
<ExternalLink href="https://example.com" variant="subtle">Subtle</ExternalLink>;

// Opens in a new window by default, and can be overridden
<ExternalLink href="https://example.com" target="_self" rel="nofollow">
  Custom target
</ExternalLink>;

// With disabled
<ExternalLink href="https://example.com" disabled>Disabled</ExternalLink>;

// With onClick
<ExternalLink href="https://example.com" onClick={(e) => e.preventDefault()}>
  With Handler
</ExternalLink>;

// StyleProps
<ExternalLink href="https://example.com" padding="2x" color="blue:50">Styled</ExternalLink>;

// Ref
const anchorRef = createRef<HTMLAnchorElement>();
<ExternalLink ref={anchorRef} href="https://example.com">With Ref</ExternalLink>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ExternalLink
<ExternalLink ref={wrongRef} href="https://example.com">Wrong Ref</ExternalLink>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for ExternalLink
<ExternalLink href="https://example.com" variant="ghost">Invalid variant</ExternalLink>;

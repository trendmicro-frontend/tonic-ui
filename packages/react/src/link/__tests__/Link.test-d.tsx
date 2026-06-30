import React, { createRef } from 'react';
import { Link } from '@tonic-ui/react';

// === Link ===
<Link href="/home">Home</Link>;

// With variant
<Link href="/" variant="default">Default</Link>;
<Link href="/" variant="inline">Inline</Link>;
<Link href="/" variant="subtle">Subtle</Link>;

// With disabled
<Link href="/" disabled>Disabled</Link>;
<Link href="/" disabled={false}>Enabled</Link>;

// With onClick
<Link href="/" onClick={(e) => e.preventDefault()}>
  With Handler
</Link>;

// Native anchor props
<Link href="/external" target="_blank" rel="noopener noreferrer">
  External
</Link>;

// StyleProps
<Link href="/" padding="2x" color="blue:50">Styled</Link>;

// Ref
const anchorRef = createRef<HTMLAnchorElement>();
<Link ref={anchorRef} href="/">With Ref</Link>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Link
<Link ref={wrongRef} href="/">Wrong Ref</Link>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for Link
<Link href="/" variant="ghost">Invalid variant</Link>;

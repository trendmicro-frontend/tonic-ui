import React, { createRef } from 'react';
import { LinkButton } from '@tonic-ui/react';

// === LinkButton ===
<LinkButton>Link Button</LinkButton>;

// With variant
<LinkButton variant="default">Default</LinkButton>;
<LinkButton variant="inline">Inline</LinkButton>;
<LinkButton variant="subtle">Subtle</LinkButton>;

// With disabled
<LinkButton disabled>Disabled</LinkButton>;
<LinkButton disabled={false}>Enabled</LinkButton>;

// With onClick
<LinkButton onClick={() => console.log('clicked')}>Clickable</LinkButton>;

// StyleProps
<LinkButton padding="2x" color="blue:50">Styled</LinkButton>;

// Ref
const linkButtonRef = createRef<HTMLButtonElement>();
<LinkButton ref={linkButtonRef}>Button</LinkButton>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to LinkButton
<LinkButton ref={wrongRef}>Wrong Ref</LinkButton>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for LinkButton
<LinkButton variant="ghost">Invalid variant</LinkButton>;

import React, { createRef } from 'react';
import { ButtonLink } from '@tonic-ui/react';

// === ButtonLink ===
<ButtonLink href="/path">Link styled as button</ButtonLink>;

// With disabled
<ButtonLink href="#" disabled>Disabled</ButtonLink>;
<ButtonLink href="#" disabled={false}>Enabled</ButtonLink>;

// With onClick
<ButtonLink href="#" onClick={() => console.log('clicked')}>Clickable</ButtonLink>;

// Native anchor props
<ButtonLink href="/external" target="_blank" rel="noopener noreferrer">
  External Link
</ButtonLink>;

// StyleProps
<ButtonLink href="#" padding="2x">Styled</ButtonLink>;

// Ref
const buttonLinkRef = createRef<HTMLAnchorElement>();
<ButtonLink ref={buttonLinkRef} href="#">Link</ButtonLink>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ButtonLink
<ButtonLink ref={wrongRef} href="#">Wrong Ref</ButtonLink>;

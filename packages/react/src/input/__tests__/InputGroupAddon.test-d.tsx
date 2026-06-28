import React, { createRef } from 'react';
import { InputGroupAddon } from '@tonic-ui/react';

// === InputGroupAddon ===
<InputGroupAddon>@</InputGroupAddon>;

// With size
<InputGroupAddon size="sm">Small</InputGroupAddon>;
<InputGroupAddon size="md">Medium</InputGroupAddon>;
<InputGroupAddon size="lg">Large</InputGroupAddon>;

// With variant
<InputGroupAddon variant="outline">@</InputGroupAddon>;
<InputGroupAddon variant="filled">https://</InputGroupAddon>;
<InputGroupAddon variant="flush">$</InputGroupAddon>;
<InputGroupAddon variant="unstyled">.com</InputGroupAddon>;

// StyleProps
<InputGroupAddon padding="1x">Styled</InputGroupAddon>;

// Ref
const addonRef = createRef<HTMLDivElement>();
<InputGroupAddon ref={addonRef}>Addon</InputGroupAddon>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputGroupAddon
<InputGroupAddon ref={wrongRef}>Addon</InputGroupAddon>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for InputGroupAddon
<InputGroupAddon variant="ghost">Invalid</InputGroupAddon>;

// @ts-expect-error - 'xl' is not a valid size for InputGroupAddon
<InputGroupAddon size="xl">Invalid</InputGroupAddon>;

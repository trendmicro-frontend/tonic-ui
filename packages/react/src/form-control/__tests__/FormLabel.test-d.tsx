import React, { createRef } from 'react';
import { FormLabel } from '@tonic-ui/react';

// === FormLabel ===
<FormLabel>Email Address</FormLabel>;

// With htmlFor
<FormLabel htmlFor="email">Email</FormLabel>;

// With required
<FormLabel required>Required Label</FormLabel>;
<FormLabel required={false}>Optional Label</FormLabel>;

// StyleProps
<FormLabel padding="2x">Styled</FormLabel>;

// Ref
const labelRef = createRef<HTMLLabelElement>();
<FormLabel ref={labelRef}>Label</FormLabel>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormLabel
<FormLabel ref={wrongRef}>Label</FormLabel>;

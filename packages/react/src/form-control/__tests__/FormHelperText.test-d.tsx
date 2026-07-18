import React, { createRef } from 'react';
import { FormHelperText } from '@tonic-ui/react';

// === FormHelperText ===
<FormHelperText>We will never share your email</FormHelperText>;

// StyleProps
<FormHelperText padding="2x">Styled</FormHelperText>;

// Ref
const helperTextRef = createRef<HTMLDivElement>();
<FormHelperText ref={helperTextRef}>Helper text</FormHelperText>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormHelperText
<FormHelperText ref={wrongRef}>Helper text</FormHelperText>;

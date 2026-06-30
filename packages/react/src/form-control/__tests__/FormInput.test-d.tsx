import React, { createRef } from 'react';
import { FormInput } from '@tonic-ui/react';

// === FormInput ===
<FormInput />;

// With size
<FormInput size="sm" />;
<FormInput size="md" />;
<FormInput size="lg" />;

// With variant
<FormInput variant="outline" />;
<FormInput variant="filled" />;
<FormInput variant="flush" />;
<FormInput variant="unstyled" />;

// With disabled
<FormInput disabled />;

// With error
<FormInput error />;

// With readOnly
<FormInput readOnly />;

// With native input props
<FormInput placeholder="Enter text" type="email" />;

// Ref
const inputRef = createRef<HTMLInputElement>();
<FormInput ref={inputRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormInput
<FormInput ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'xl' is not a valid size for FormInput
<FormInput size="xl" />;

// @ts-expect-error - 'solid' is not a valid variant for FormInput
<FormInput variant="solid" />;

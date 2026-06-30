import React, { createRef } from 'react';
import { FormTextarea } from '@tonic-ui/react';

// === FormTextarea ===
<FormTextarea />;

// With variant
<FormTextarea variant="outline" />;
<FormTextarea variant="filled" />;
<FormTextarea variant="unstyled" />;

// With disabled
<FormTextarea disabled />;

// With error
<FormTextarea error />;

// With readOnly
<FormTextarea readOnly />;

// With rows and cols
<FormTextarea rows={5} cols={40} />;

// With maxLength and minLength
<FormTextarea maxLength={500} minLength={10} />;

// With resize
<FormTextarea resize="none" />;
<FormTextarea resize="both" />;
<FormTextarea resize="horizontal" />;
<FormTextarea resize="vertical" />;

// With native textarea props
<FormTextarea placeholder="Enter text" />;

// Ref
const textareaRef = createRef<HTMLTextAreaElement>();
<FormTextarea ref={textareaRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormTextarea
<FormTextarea ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for FormTextarea
<FormTextarea variant="solid" />;

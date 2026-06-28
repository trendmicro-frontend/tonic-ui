import React, { createRef } from 'react';
import { FormErrorMessage } from '@tonic-ui/react';

// === FormErrorMessage ===
<FormErrorMessage errors="This field is required" />;

// With array errors
<FormErrorMessage errors={['Error 1', 'Error 2']} />;

// StyleProps
<FormErrorMessage padding="2x" errors="Error" />;

// Ref
const errorMessageRef = createRef<HTMLDivElement>();
<FormErrorMessage ref={errorMessageRef} errors="Error" />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormErrorMessage
<FormErrorMessage ref={wrongRef} errors="Error" />;

import React, { createRef } from 'react';
import { Spinner } from '@tonic-ui/react';

// === Spinner ===
<Spinner />;

// With size
<Spinner size="xs" />;
<Spinner size="sm" />;
<Spinner size="md" />;
<Spinner size="lg" />;
<Spinner size="xl" />;

// StyleProps
<Spinner color="blue:50" />;

// Ref
const spinnerRef = createRef<HTMLDivElement>();
<Spinner ref={spinnerRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Spinner
<Spinner ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'xxl' is not a valid size for Spinner
<Spinner size="xxl" />;

import React, { createRef } from 'react';
import { FormCharacterCount } from '@tonic-ui/react';

// === FormCharacterCount ===
<FormCharacterCount />;

// With count and maxCount
<FormCharacterCount count={50} maxCount={100} />;

// With count only
<FormCharacterCount count={10} />;

// StyleProps
<FormCharacterCount padding="2x" count={0} maxCount={100} />;

// Ref
const charCountRef = createRef<HTMLDivElement>();
<FormCharacterCount ref={charCountRef} count={0} maxCount={100} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormCharacterCount
<FormCharacterCount ref={wrongRef} />;

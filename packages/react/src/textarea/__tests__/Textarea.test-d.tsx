import React, { createRef } from 'react';
import { Textarea } from '@tonic-ui/react';

// === Textarea ===
<Textarea />;

// With placeholder
<Textarea placeholder="Enter text..." />;

// With rows and cols
<Textarea rows={5} />;
<Textarea cols={40} />;
<Textarea rows={5} cols={40} />;

// With maxLength and minLength
<Textarea maxLength={500} />;
<Textarea minLength={10} />;
<Textarea minLength={10} maxLength={500} />;

// With resize
<Textarea resize="none" />;
<Textarea resize="vertical" />;
<Textarea resize="horizontal" />;
<Textarea resize="both" />;

// With variant
<Textarea variant="outline" />;
<Textarea variant="unstyled" />;

// With disabled
<Textarea disabled />;

// With readOnly
<Textarea readOnly />;

// With error state
<Textarea error />;

// With value and onChange
<Textarea value="test" onChange={(e) => console.log(e.target.value)} />;

// StyleProps
<Textarea padding="2x" />;

// Ref
const textareaRef = createRef<HTMLTextAreaElement>();
<Textarea ref={textareaRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Textarea
<Textarea ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for Textarea
<Textarea variant="solid" />;

// @ts-expect-error - 'diagonal' is not a valid resize for Textarea
<Textarea resize="diagonal" />;

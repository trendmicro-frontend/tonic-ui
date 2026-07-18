import React, { createRef } from 'react';
import { Radio } from '@tonic-ui/react';

// === Radio ===
<Radio>Option</Radio>;

// With checked
<Radio checked>Checked</Radio>;

// With defaultChecked
<Radio defaultChecked>Default Checked</Radio>;

// With disabled
<Radio disabled>Disabled</Radio>;

// With id
<Radio id="radio-1">With ID</Radio>;

// With name and value
<Radio name="option" value="1">Option 1</Radio>;

// With size
<Radio size="sm">Small</Radio>;
<Radio size="md">Medium</Radio>;
<Radio size="lg">Large</Radio>;

// With variantColor
<Radio variantColor="green">Green radio</Radio>;
<Radio variantColor="red">Red radio</Radio>;
<Radio variantColor="blue">Blue radio</Radio>;

// With onChange
<Radio onChange={(e) => console.log(e.target.checked)}>
  With onChange
</Radio>;

// With onBlur
<Radio onBlur={(e) => console.log(e.target)}>
  With onBlur
</Radio>;

// With onClick
<Radio onClick={(e) => console.log(e.target)}>
  With onClick
</Radio>;

// With onFocus
<Radio onFocus={(e) => console.log(e.target)}>
  With onFocus
</Radio>;

// With inputProps
<Radio inputProps={{ 'aria-label': 'Option 1' }}>Accessible</Radio>;

// With inputRef
const inputRef = createRef<HTMLInputElement>();
<Radio inputRef={inputRef}>With input ref</Radio>;

// StyleProps
<Radio padding="2x">Styled</Radio>;

// Ref
const radioRef = createRef<HTMLLabelElement>();
<Radio ref={radioRef}>With Ref</Radio>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Radio
<Radio ref={wrongRef}>Wrong Ref</Radio>;

// === Negative tests ===
// @ts-expect-error - 'xl' is not a valid size for Radio
<Radio size="xl">Invalid size</Radio>;

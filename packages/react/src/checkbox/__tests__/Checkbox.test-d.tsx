import React, { createRef } from 'react';
import { Checkbox } from '@tonic-ui/react';

// === Checkbox ===
<Checkbox>Accept terms</Checkbox>;

// With checked
<Checkbox checked>Checked</Checkbox>;

// With defaultChecked
<Checkbox defaultChecked>Default Checked</Checkbox>;

// With disabled
<Checkbox disabled>Disabled</Checkbox>;

// With indeterminate
<Checkbox indeterminate>Indeterminate</Checkbox>;

// With id
<Checkbox id="checkbox-1">With ID</Checkbox>;

// With name and value
<Checkbox name="option" value="1">Option 1</Checkbox>;

// With size
<Checkbox size="sm">Small</Checkbox>;
<Checkbox size="md">Medium</Checkbox>;
<Checkbox size="lg">Large</Checkbox>;

// With variantColor
<Checkbox variantColor="green">Green checkbox</Checkbox>;
<Checkbox variantColor="red">Red checkbox</Checkbox>;
<Checkbox variantColor="blue">Blue checkbox</Checkbox>;

// With onChange
<Checkbox onChange={(e) => console.log(e.target.checked)}>
  With onChange
</Checkbox>;

// With onBlur
<Checkbox onBlur={(e) => console.log(e.target)}>
  With onBlur
</Checkbox>;

// With onClick
<Checkbox onClick={(e) => console.log(e.target)}>
  With onClick
</Checkbox>;

// With onFocus
<Checkbox onFocus={(e) => console.log(e.target)}>
  With onFocus
</Checkbox>;

// With inputProps
<Checkbox inputProps={{ 'aria-label': 'Accept terms' }}>Accessible</Checkbox>;

// With inputRef
const inputRef = createRef<HTMLInputElement>();
<Checkbox inputRef={inputRef}>With input ref</Checkbox>;

// StyleProps
<Checkbox padding="2x">Styled</Checkbox>;

// Ref
const checkboxRef = createRef<HTMLLabelElement>();
<Checkbox ref={checkboxRef}>With Ref</Checkbox>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Checkbox
<Checkbox ref={wrongRef}>Wrong Ref</Checkbox>;

// === Negative tests ===
// @ts-expect-error - 'xl' is not a valid size for Checkbox
<Checkbox size="xl">Invalid size</Checkbox>;

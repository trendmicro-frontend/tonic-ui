import React, { createRef } from 'react';
import { Switch } from '@tonic-ui/react';

// === Switch ===
<Switch>Toggle</Switch>;
<Switch />;

// With checked
<Switch checked>Checked</Switch>;

// With defaultChecked
<Switch defaultChecked>Default Checked</Switch>;

// With disabled
<Switch disabled>Disabled</Switch>;

// With id
<Switch id="toggle-1">With ID</Switch>;

// With name
<Switch name="notifications">With name</Switch>;

// With size
<Switch size="sm">Small</Switch>;
<Switch size="md">Medium</Switch>;
<Switch size="lg">Large</Switch>;

// With readOnly
<Switch readOnly>Read-only</Switch>;
<Switch readOnly defaultChecked>Read-only on</Switch>;
<Switch readOnly disabled>Disabled wins</Switch>;

// With variantColor
<Switch variantColor="green">Green switch</Switch>;
<Switch variantColor="red">Red switch</Switch>;
<Switch variantColor="blue">Blue switch</Switch>;

// With value (string or boolean)
<Switch value="on">String value</Switch>;
<Switch value={true}>Boolean value</Switch>;

// With onChange
<Switch onChange={(e) => console.log(e.target.checked)}>
  With onChange
</Switch>;

// With onBlur
<Switch onBlur={() => console.log('blur')}>With onBlur</Switch>;

// With onClick
<Switch onClick={() => console.log('click')}>With onClick</Switch>;

// With onFocus
<Switch onFocus={() => console.log('focus')}>With onFocus</Switch>;

// With inputProps
<Switch inputProps={{ 'aria-label': 'Toggle switch' }}>Accessible</Switch>;

// With inputRef
const inputRef = createRef<HTMLInputElement>();
<Switch inputRef={inputRef}>With input ref</Switch>;

// StyleProps
<Switch padding="2x">Styled</Switch>;

// Ref
const switchRef = createRef<HTMLLabelElement>();
<Switch ref={switchRef}>With Ref</Switch>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Switch
<Switch ref={wrongRef}>Wrong Ref</Switch>;

// === Negative tests ===
// @ts-expect-error - 'xl' is not a valid size for Switch
<Switch size="xl">Invalid size</Switch>;

// @ts-expect-error - readOnly must be boolean
<Switch readOnly="yes">Invalid readOnly</Switch>;

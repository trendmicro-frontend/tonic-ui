import React, { createRef } from 'react';
import { ButtonBase } from '@tonic-ui/react';

// === ButtonBase ===
<ButtonBase>Base Button</ButtonBase>;

// With disabled
<ButtonBase disabled>Disabled</ButtonBase>;
<ButtonBase disabled={false}>Enabled</ButtonBase>;

// With native button props
<ButtonBase type="submit">Submit</ButtonBase>;
<ButtonBase type="button">Button</ButtonBase>;
<ButtonBase type="reset">Reset</ButtonBase>;

// StyleProps
<ButtonBase padding="2x">Styled</ButtonBase>;

// Ref
const buttonBaseRef = createRef<HTMLButtonElement>();
<ButtonBase ref={buttonBaseRef}>Base</ButtonBase>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ButtonBase
<ButtonBase ref={wrongRef}>Wrong Ref</ButtonBase>;

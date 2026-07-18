import React, { createRef } from 'react';
import { InputAdornment } from '@tonic-ui/react';

// === InputAdornment ===
<InputAdornment>$</InputAdornment>;
<InputAdornment>@</InputAdornment>;

// With children as element
<InputAdornment><span>icon</span></InputAdornment>;

// StyleProps
<InputAdornment padding="1x">Styled</InputAdornment>;

// Ref
const adornmentRef = createRef<HTMLDivElement>();
<InputAdornment ref={adornmentRef}>@</InputAdornment>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputAdornment
<InputAdornment ref={wrongRef}>@</InputAdornment>;

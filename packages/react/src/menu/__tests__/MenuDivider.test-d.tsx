import React, { createRef } from 'react';
import { MenuDivider } from '@tonic-ui/react';

// === MenuDivider ===
<MenuDivider />;

// StyleProps
<MenuDivider margin="2x" borderColor="gray:30" />;

// Ref
const dividerRef = createRef<HTMLHRElement>();
<MenuDivider ref={dividerRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuDivider
<MenuDivider ref={wrongRef} />;

import React, { createRef } from 'react';
import { MenuButton } from '@tonic-ui/react';

// === MenuButton ===
<MenuButton>Click me</MenuButton>;

// With disabled
<MenuButton disabled>Disabled</MenuButton>;
<MenuButton disabled={false}>Enabled</MenuButton>;

// StyleProps
<MenuButton padding="4x" margin="2x" backgroundColor="blue:50">
  Styled
</MenuButton>;

// Ref
const menuButtonRef = createRef<HTMLButtonElement>();
<MenuButton ref={menuButtonRef}>Button</MenuButton>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuButton
<MenuButton ref={wrongRef}>Button</MenuButton>;

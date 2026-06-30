import React, { createRef } from 'react';
import { SubmenuTrigger } from '@tonic-ui/react';

// === SubmenuTrigger ===
<SubmenuTrigger>Open Submenu</SubmenuTrigger>;

// With disabled
<SubmenuTrigger disabled>Disabled</SubmenuTrigger>;

// With onClick
<SubmenuTrigger onClick={() => console.log('click')}>Click</SubmenuTrigger>;

// With onKeyDown
<SubmenuTrigger onKeyDown={(e) => console.log(e.key)}>KeyDown</SubmenuTrigger>;

// StyleProps
<SubmenuTrigger padding="2x">Styled</SubmenuTrigger>;

// Ref
const triggerRef = createRef<HTMLButtonElement>();
<SubmenuTrigger ref={triggerRef}>Trigger</SubmenuTrigger>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to SubmenuTrigger
<SubmenuTrigger ref={wrongRef}>Trigger</SubmenuTrigger>;

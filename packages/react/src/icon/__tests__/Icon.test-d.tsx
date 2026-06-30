import React, { createRef } from 'react';
import { Icon } from '@tonic-ui/react';

// === Icon ===
<Icon />;

// With icon prop
<Icon icon="check" />;

// With spin
<Icon spin />;
<Icon spin={true} />;
<Icon spin={false} />;
<Icon spin="cw" />;
<Icon spin="ccw" />;

// With children (custom SVG content)
<Icon>
  <path d="M10 10" />
</Icon>;

// StyleProps
<Icon color="blue:50" width="24px" height="24px" />;

// Ref
const iconRef = createRef<SVGSVGElement>();
<Icon ref={iconRef} />;

const wrongRef = createRef<HTMLDivElement>();
// @ts-expect-error - HTMLDivElement ref should not be assignable to Icon
<Icon ref={wrongRef} />;

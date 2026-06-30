import React, { createRef } from 'react';
import { Badge, Icon } from '@tonic-ui/react';

// === Badge ===
<Badge>Badge</Badge>;

// With variant
<Badge variant="solid">Solid</Badge>;
<Badge variant="dot">Dot</Badge>;

// With placement
<Badge placement="top-left">Top Left</Badge>;
<Badge placement="top-right">Top Right</Badge>;
<Badge placement="bottom-left">Bottom Left</Badge>;
<Badge placement="bottom-right">Bottom Right</Badge>;

// With badgeContent
<Badge badgeContent={5}>Content</Badge>;
<Badge badgeContent="99+">Content</Badge>;
<Badge badgeContent={<span>New</span>}>Content</Badge>;
<Badge badgeContent={0}>Zero</Badge>;

// With isInvisible
<Badge isInvisible>Invisible</Badge>;
<Badge isInvisible={false}>Visible</Badge>;

// Combined props
<Badge variant="solid" placement="top-right" badgeContent={10}>
  <Icon icon="bell" />
</Badge>;

// StyleProps
<Badge padding="1x" backgroundColor="red:50">Styled</Badge>;

// Ref
const badgeRef = createRef<HTMLDivElement>();
<Badge ref={badgeRef}>Badge</Badge>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Badge
<Badge ref={wrongRef}>Wrong Ref</Badge>;

// === Negative tests ===
// @ts-expect-error - 'outline' is not a valid variant for Badge
<Badge variant="outline">Invalid variant</Badge>;

// @ts-expect-error - 'center' is not a valid placement for Badge
<Badge placement="center">Invalid placement</Badge>;

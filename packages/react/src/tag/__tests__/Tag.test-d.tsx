import React, { createRef } from 'react';
import { Tag } from '@tonic-ui/react';

// === Tag ===
<Tag>Tag</Tag>;

// With variant
<Tag variant="solid">Solid</Tag>;
<Tag variant="outline">Outline</Tag>;

// With size
<Tag size="sm">Small</Tag>;
<Tag size="md">Medium</Tag>;
<Tag size="lg">Large</Tag>;

// With disabled
<Tag disabled>Disabled</Tag>;

// With error
<Tag error>Error tag</Tag>;

// With isClosable and onClose
<Tag isClosable onClose={() => console.log('close')}>
  Closable
</Tag>;

// StyleProps
<Tag padding="2x" backgroundColor="blue:50">Styled</Tag>;

// Ref
const tagRef = createRef<HTMLDivElement>();
<Tag ref={tagRef}>Tag</Tag>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Tag
<Tag ref={wrongRef}>Tag</Tag>;

// === Negative tests ===
// @ts-expect-error - 'ghost' is not a valid variant for Tag
<Tag variant="ghost">Invalid variant</Tag>;

// @ts-expect-error - 'xl' is not a valid size for Tag
<Tag size="xl">Invalid size</Tag>;

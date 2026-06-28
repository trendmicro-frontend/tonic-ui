import React, { createRef } from 'react';
import { Highlight, Mark } from '@tonic-ui/react';

// === Highlight ===
<Highlight query="text">
  This is some text with highlighted text
</Highlight>;

// With array query
<Highlight query={['text', 'some']}>
  This is some text with highlighted text
</Highlight>;

// With caseSensitive
<Highlight query="Text" caseSensitive>
  This is some Text with highlighted text
</Highlight>;
<Highlight query="Text" caseSensitive={false}>
  Case insensitive
</Highlight>;

// With variant
<Highlight query="text" variant="none">Content</Highlight>;
<Highlight query="text" variant="emphasis">Content</Highlight>;
<Highlight query="text" variant="highlight">Content</Highlight>;

// With transform
<Highlight query="text" transform={(word) => word.toLowerCase()}>
  Content
</Highlight>;

// With custom Mark slot
<Highlight
  query="text"
  slots={{ mark: Mark }}
  slotProps={{ mark: { variant: 'emphasis' } }}
>
  Custom mark component
</Highlight>;

// StyleProps
<Highlight query="text" padding="2x">
  Styled highlight
</Highlight>;

// Ref
const highlightRef = createRef<HTMLDivElement>();
<Highlight ref={highlightRef} query="text">
  With ref
</Highlight>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Highlight
<Highlight ref={wrongRef} query="text">
  Wrong ref
</Highlight>;

// === Negative tests ===
// @ts-expect-error - 'bold' is not a valid variant for Highlight
<Highlight query="text" variant="bold">Content</Highlight>;

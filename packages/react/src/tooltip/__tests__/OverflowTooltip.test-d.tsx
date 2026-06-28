import React, { createRef } from 'react';
import { OverflowTooltip } from '@tonic-ui/react';

// === OverflowTooltip ===
<OverflowTooltip label="This is a very long text that might overflow">
  Short text
</OverflowTooltip>;

// Ref
const overflowRef = createRef<HTMLDivElement>();
<OverflowTooltip ref={overflowRef} label="Tooltip">
  Content
</OverflowTooltip>;

// With render prop children
<OverflowTooltip label="Long text tooltip">
  {(context) => (
    <div>Custom truncated content</div>
  )}
</OverflowTooltip>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to OverflowTooltip
<OverflowTooltip ref={wrongRef} label="Tooltip">Content</OverflowTooltip>;

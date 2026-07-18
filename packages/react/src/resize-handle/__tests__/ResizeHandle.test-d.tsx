import React, { createRef } from 'react';
import { ResizeHandle } from '@tonic-ui/react';

// Basic usage
<ResizeHandle />;

// With orientation
<ResizeHandle orientation="horizontal" />;
<ResizeHandle orientation="vertical" />;

// With callback props - NO manual type annotations
<ResizeHandle onResizeStart={({ clientX, clientY }) => console.log('start', { clientX, clientY })} />;
<ResizeHandle onResize={({ clientX, clientY }) => console.log('resize', { clientX, clientY })} />;
<ResizeHandle onResizeEnd={({ clientX, clientY }) => console.log('end', { clientX, clientY })} />;

// Ref
const resizeRef = createRef<HTMLDivElement>();
<ResizeHandle ref={resizeRef} />;

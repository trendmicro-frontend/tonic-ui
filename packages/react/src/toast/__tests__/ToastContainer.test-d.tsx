import React, { createRef } from 'react';
import { ToastContainer, Toast } from '@tonic-ui/react';

// Basic usage
<ToastContainer>
  <Toast>Toast 1</Toast>
  <Toast>Toast 2</Toast>
</ToastContainer>;

// With placement
<ToastContainer placement="top">
  <Toast>Top</Toast>
</ToastContainer>;
<ToastContainer placement="top-left">
  <Toast>Top Left</Toast>
</ToastContainer>;
<ToastContainer placement="top-right">
  <Toast>Top Right</Toast>
</ToastContainer>;
<ToastContainer placement="bottom">
  <Toast>Bottom</Toast>
</ToastContainer>;
<ToastContainer placement="bottom-left">
  <Toast>Bottom Left</Toast>
</ToastContainer>;
<ToastContainer placement="bottom-right">
  <Toast>Bottom Right</Toast>
</ToastContainer>;

// Ref
const containerRef = createRef<HTMLDivElement>();
<ToastContainer ref={containerRef}>
  <Toast>Toast</Toast>
</ToastContainer>;

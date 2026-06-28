import React, { createRef } from 'react';
import { ToastTransition, Toast } from '@tonic-ui/react';

// Basic usage
<ToastTransition in>
  <Toast>Animated toast</Toast>
</ToastTransition>;

// Ref
const transitionRef = createRef<HTMLDivElement>();
<ToastTransition ref={transitionRef} in>
  <Toast>Toast</Toast>
</ToastTransition>;

// With render prop (children as function) - NO manual type annotations
<ToastTransition in>
  {(state) => (
    <Toast>State: {state}</Toast>
  )}
</ToastTransition>;

// With easing as string
<ToastTransition in easing="ease-in-out">
  <Toast>Toast</Toast>
</ToastTransition>;

// With easing as object
<ToastTransition in easing={{ enter: 'ease-in', exit: 'ease-out' }}>
  <Toast>Toast</Toast>
</ToastTransition>;

// With timeout as number
<ToastTransition in timeout={300}>
  <Toast>Toast</Toast>
</ToastTransition>;

// With timeout as object
<ToastTransition in timeout={{ enter: 250, exit: 200 }}>
  <Toast>Toast</Toast>
</ToastTransition>;

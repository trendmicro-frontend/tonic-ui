import React, { createRef } from 'react';
import { ToastController, Toast } from '@tonic-ui/react';

// Basic usage
<ToastController duration={5000}>
  <Toast>Auto-dismiss toast</Toast>
</ToastController>;

// Ref
const controllerRef = createRef<HTMLDivElement>();
<ToastController ref={controllerRef} duration={3000}>
  <Toast>Toast</Toast>
</ToastController>;

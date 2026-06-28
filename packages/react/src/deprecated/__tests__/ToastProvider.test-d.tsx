import React, { createRef } from 'react';
import { ToastProvider } from '@tonic-ui/react';

// Basic usage (deprecated, use ToastManager)
<ToastProvider />;

// Ref
const toastProviderRef = createRef<HTMLDivElement>();
<ToastProvider ref={toastProviderRef} />;

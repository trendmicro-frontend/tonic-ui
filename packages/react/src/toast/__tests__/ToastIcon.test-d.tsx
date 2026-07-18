import React, { createRef } from 'react';
import { ToastIcon } from '@tonic-ui/react';

// Basic usage
<ToastIcon />;

// Ref
const iconRef = createRef<HTMLDivElement>();
<ToastIcon ref={iconRef} />;

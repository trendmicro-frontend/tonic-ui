import React, { createRef } from 'react';
import { AlertIcon } from '@tonic-ui/react';

// Basic usage
<AlertIcon />;

// Ref
const iconRef = createRef<HTMLDivElement>();
<AlertIcon ref={iconRef} />;

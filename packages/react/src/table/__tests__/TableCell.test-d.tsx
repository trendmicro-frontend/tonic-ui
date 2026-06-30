import React, { createRef } from 'react';
import { TableCell } from '@tonic-ui/react';

// Basic usage
<TableCell>Cell content</TableCell>;

// Ref
const cellRef = createRef<HTMLElement>();
<TableCell ref={cellRef}>Cell</TableCell>;

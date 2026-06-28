import React, { createRef } from 'react';
import { TreeItemContent } from '@tonic-ui/react';

// Basic usage
<TreeItemContent>Content</TreeItemContent>;

// Ref
const contentRef = createRef<HTMLDivElement>();
<TreeItemContent ref={contentRef}>Content</TreeItemContent>;

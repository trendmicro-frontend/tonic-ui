import React, { createRef } from 'react';
import { DarkMode, Button, Text } from '@tonic-ui/react';

// Basic usage
<DarkMode>
  <div>Always dark mode content</div>
</DarkMode>;

// With children components
<DarkMode>
  <Button>Dark Button</Button>
  <Text>Dark Text</Text>
</DarkMode>;

// StyleProps
<DarkMode padding="4x" margin="2x">
  Content
</DarkMode>;

// Ref
const darkRef = createRef<HTMLDivElement>();
<DarkMode ref={darkRef}>Content</DarkMode>;

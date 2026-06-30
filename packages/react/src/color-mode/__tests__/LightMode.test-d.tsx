import React, { createRef } from 'react';
import { LightMode, Button, Text } from '@tonic-ui/react';

// Basic usage
<LightMode>
  <div>Always light mode content</div>
</LightMode>;

// With children components
<LightMode>
  <Button>Light Button</Button>
  <Text>Light Text</Text>
</LightMode>;

// StyleProps
<LightMode padding="4x" margin="2x">
  Content
</LightMode>;

// Ref
const lightRef = createRef<HTMLDivElement>();
<LightMode ref={lightRef}>Content</LightMode>;

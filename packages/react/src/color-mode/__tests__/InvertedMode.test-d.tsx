import React, { createRef } from 'react';
import { InvertedMode, Button, Text } from '@tonic-ui/react';

// Basic usage
<InvertedMode>
  <div>Content with inverted colors</div>
</InvertedMode>;

// With children components
<InvertedMode>
  <Button>Inverted Button</Button>
  <Text>Inverted Text</Text>
</InvertedMode>;

// StyleProps
<InvertedMode padding="4x" margin="2x">
  Content
</InvertedMode>;

// Ref
const invertedRef = createRef<HTMLDivElement>();
<InvertedMode ref={invertedRef}>Content</InvertedMode>;

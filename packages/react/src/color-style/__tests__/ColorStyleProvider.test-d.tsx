import React from 'react';
import { ColorStyleProvider } from '@tonic-ui/react';

// Basic usage
<ColorStyleProvider>
  <div>Color style context</div>
</ColorStyleProvider>;

// With defaultValue
<ColorStyleProvider defaultValue={{ dark: {}, light: {} }}>
  <div>Custom styles</div>
</ColorStyleProvider>;

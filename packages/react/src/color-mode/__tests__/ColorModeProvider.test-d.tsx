import React from 'react';
import { ColorModeProvider } from '@tonic-ui/react';

// Basic usage
<ColorModeProvider>
  <div>Color mode context</div>
</ColorModeProvider>;

// With defaultValue
<ColorModeProvider defaultValue="dark">
  <div>Dark by default</div>
</ColorModeProvider>;

// With value (controlled) - NO manual type annotations
<ColorModeProvider value="light" onChange={(mode) => console.log(mode)}>
  <div>Controlled mode</div>
</ColorModeProvider>;

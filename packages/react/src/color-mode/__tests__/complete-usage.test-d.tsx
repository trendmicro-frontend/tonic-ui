import React from 'react';
import { LightMode, DarkMode, InvertedMode } from '@tonic-ui/react';

// Complete usage patterns

// Force dark mode in a light theme
<LightMode>
  <div>This area is always light</div>
  <DarkMode>
    <div>This nested area is always dark</div>
  </DarkMode>
</LightMode>;

// Invert the current color mode
<InvertedMode>
  <div>This area has inverted colors</div>
</InvertedMode>;

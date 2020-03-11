import React from 'react';
import ColorModeProvider from '../ColorModeProvider';

const LightMode = (props) => (
  <ColorModeProvider value="light" {...props} />
);

export default LightMode;

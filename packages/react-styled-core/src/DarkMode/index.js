import React from 'react';
import ColorModeProvider from '../ColorModeProvider';

const DarkMode = (props) => (
  <ColorModeProvider value="dark" {...props} />
);

export default DarkMode;

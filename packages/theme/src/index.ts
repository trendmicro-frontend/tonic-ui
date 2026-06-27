import _createTheme from './createTheme.js';
const createTheme = _createTheme;
export { createTheme };

import _theme from './createTheme.js';
const theme = (_theme as any)('rem');
export default theme;

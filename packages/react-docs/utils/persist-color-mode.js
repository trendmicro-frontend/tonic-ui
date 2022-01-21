/**
 * Set the color mode for the root element and persist it in localStorage.
 *
 * Note: "pages/_document.js" will set the color mode for the root element
 */
const persistColorMode = (colorMode) => {
  if (colorMode !== 'dark' && colorMode !== 'light') {
    // Remove the "color-scheme" style from the root element
    const root = document.documentElement;
    root.style.setProperty('color-scheme', '');

    // Remove persisted color mode from localStorage
    localStorage.removeItem('tonic-ui-color-mode');
    return;
  }

  // Set the color mode for the root element
  const root = document.documentElement;
  root.style.setProperty('color-scheme', colorMode);

  // Persist the color mode in the localStorage
  localStorage.setItem('tonic-ui-color-mode', colorMode);
};

export default persistColorMode;

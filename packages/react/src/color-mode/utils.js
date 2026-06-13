// The `win` argument provides the window context (e.g. from `useEnvironment`)
// so these helpers do not reference the global `window` directly.
const matchMediaQuery = (query, win = window) => {
  const mediaQueryList = win?.matchMedia?.(query);
  if (!mediaQueryList) {
    return undefined;
  }
  return mediaQueryList.matches;
};

export const colorSchemeQuery = {
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
};

export const getColorScheme = (fallbackColorMode, win = window) => {
  const isDarkColorScheme = matchMediaQuery(colorSchemeQuery.dark, win) ?? (fallbackColorMode === 'dark');
  return isDarkColorScheme ? 'dark' : 'light';
};

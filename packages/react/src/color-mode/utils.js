const matchMediaQuery = (query) => {
  const mediaQueryList = window?.matchMedia?.(query);
  if (!mediaQueryList) {
    return undefined;
  }
  return mediaQueryList.matches;
};

export const colorSchemeQuery = {
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
};

export const getColorScheme = (fallbackColorMode) => {
  const isDarkColorScheme = matchMediaQuery(colorSchemeQuery.dark) ?? (fallbackColorMode === 'dark');
  return isDarkColorScheme ? 'dark' : 'light';
};

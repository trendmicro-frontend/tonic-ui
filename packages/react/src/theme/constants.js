/**
 * A symbol marker used to identify themes created with `createTheme()`.
 * ThemeProvider and TonicProvider use this to distinguish createTheme output
 * from plain objects, avoiding unnecessary re-processing.
 */
export const TONIC_THEME = Symbol('tonic-theme');

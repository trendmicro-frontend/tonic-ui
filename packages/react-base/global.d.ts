declare global {
  /**
   * TODO: Add more specific types instead of using `any`
   *
   * Style properties that can be applied to Tonic UI components.
   * Includes both native CSS properties and styled-system properties.
   *
   * @example
   * // Native CSS properties
   * <Box backgroundColor="red" color="white" padding="16px" />
   *
   * @example
   * // Styled-system shorthand properties
   * <Box bg="red" color="white" p="4x" />
   *
   * @example
   * // The sx prop for custom styles with theme access
   * <Box sx={{ ':hover': { backgroundColor: 'blue:50' } }} />
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type StyleProps = Record<string, any>;

  /**
   * Theme token scales returned by `createTheme()` and `useTheme()`.
   * Represents the theme object structure with nested token values
   * (e.g. `{ colors: { red: { 600: '#dd1128' } }, space: { '4x': '1rem' } }`).
   *
   * This is intentionally separate from `StyleProps` which describes
   * styled-system props on components (e.g. `<Box mb="2x" />`).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ThemeScales = Record<string, any>;
}

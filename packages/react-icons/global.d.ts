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
}

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

  /* eslint-disable @typescript-eslint/no-empty-object-type */

  /**
   * A `forwardRef` component that merges `StyleProps`, native element props
   * (with conflicting keys omitted), custom props, and a ref attribute.
   *
   * @template E - The intrinsic element type (e.g. `'div'`, `'button'`).
   * @template P - Custom component props.
   * @template [R=HTMLElement] - The ref element type.
   */
  type ForwardRefComponent<
    E extends React.ElementType,
    P = {},
    R extends Element = HTMLElement,
  > = React.ForwardRefExoticComponent<
    StyleProps
      & Omit<React.ComponentPropsWithoutRef<E>, keyof P>
      & P
      & React.RefAttributes<R>
  >;

  /**
   * A functional component that merges `StyleProps` with custom props.
   * Useful for components that don't need `forwardRef` (e.g. providers, containers).
   *
   * @template P - Custom component props.
   */
  type StyledFC<P = {}> = React.FC<StyleProps & P>;

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

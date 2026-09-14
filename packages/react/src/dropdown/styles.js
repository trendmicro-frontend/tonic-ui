import { useTheme } from '../theme';

// Content sizing behavior:
// - `{toggleWidth}` is the toggle's `offsetWidth`
// - `{contentWidth}` is `slotProps.content.width`
//
// Behavior         | minWidth        | width                              | maxWidth | maxHeight | zIndex
// -----------------|-----------------|------------------------------------|----------|-----------|---------
// `matchWidth` set | —               | `{toggleWidth} ?? 'max-content'`   | —        | 40vh      | popover (portalled) / — (default)
// Default behavior | `{toggleWidth}` | `{contentWidth} ?? 'max-content'`  | 640px    | 40vh      | popover (portalled) / — (default)
//
// Note: `maxHeight: '40vh'` follows MUI's approach. It scales with the viewport to avoid overflow on small screens while making better use of space on larger screens. A fixed height would either clip content or waste space.
//
// This is a plain function (not a `use*Style` hook) because it is evaluated inside
// `Menu`'s render-prop child — where `toggleWidth` is read from the toggle ref — and
// React hooks cannot be called there. It does not depend on the theme.
const getDropdownContentStyle = ({ matchWidth, portalled, contentWidth, toggleWidth }) => {
  const base = {
    maxHeight: '40vh',
    overflowY: 'auto',
    ...(portalled && { zIndex: 'popover' }),
  };
  if (matchWidth) {
    return {
      ...base,
      width: toggleWidth ?? 'max-content',
    };
  }
  return {
    ...base,
    minWidth: toggleWidth,
    maxWidth: 640,
    width: contentWidth ?? 'max-content',
  };
};

const useDropdownButtonStyle = ({ variant }) => {
  const baseStyle = {
    display: 'inline-flex',
    columnGap: '1x',
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
    '> :first-of-type': {
      minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
    },
  };

  // Override the hover/active color from Button's `text.accent` (gray 96%) to the softer
  // `text.primary` (gray 80%). Not redundant: a menu button intentionally keeps the primary
  // label color on hover/active instead of emphasizing to accent like a plain Button.
  const variantStyle = {
    'ghost': {
      '&:hover': { color: 'text.primary' },
      '&:active': { color: 'text.primary' },
    },
    'secondary': {
      '&:hover': { color: 'text.primary' },
      '&:active': { color: 'text.primary' },
    },
  }[variant];

  return {
    ...baseStyle,
    ...variantStyle,
  };
};

// The chip is a `Tag` pill that is itself the dropdown toggle: the whole pill is
// focusable and clickable. The close button is a sibling overlay instead of a
// control nested inside the toggle, because interactive controls must not be
// nested.
//
// `Tag` authors its own base styling as style props (tier 1), which outrank the
// `__sx` channel (tier 0). Declarations that must beat `Tag`'s base therefore
// come back as `styleProps` and are applied as style props on the pill;
// everything else rides `__sx`.
const useDropdownChipRootStyle = () => {
  return {
    display: 'inline-flex',
    maxWidth: '100%',
    position: 'relative', // positioning context for the close button overlay
    width: '100%',
  };
};

const useDropdownChipPillStyle = ({ disabled, isClosable }) => {
  const theme = useTheme();
  const borderWidth = theme.sizes['1q'];
  const closeButtonSize = theme.sizes['4x'];
  const gap = theme.sizes['2x'];

  return {
    sx: {
      // The whole pill is the toggle, so the whole chip shows the pointer cursor.
      cursor: disabled ? 'not-allowed' : 'pointer',
      maxWidth: '100%',
      width: '100%',
      '> :first-of-type': {
        minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
      },
    },
    // Applied as props on the pill, after `Tag`'s own base styling, because both
    // style props and pseudo props outrank the `__sx` channel:
    // - `borderRadius` / `pr` must beat `Tag`'s own style props
    // - `_focusVisible` must beat `Tag`'s own focus ring (a blue outline)
    overrides: {
      borderRadius: 'lg', // Override the pill radius of `Tag`
      // Reserve room for the close button overlay so the label truncates before it
      ...(isClosable && {
        pr: `calc(${theme.sizes['2x']} - ${borderWidth} + ${closeButtonSize} + ${gap})`,
      }),
      // Keyboard focus ring: the toggle convention (mirrors `useButtonStyle`) —
      // a white outer ring with an inner hairline. `outline: none` clears the
      // blue outline that `Tag` draws while focused.
      //
      // No `zIndex` here (unlike `useButtonStyle`, where it lifts a focused
      // button above overlapping siblings): a z-index on the focused pill would
      // paint the pill above the close button overlay and hide it.
      _focusVisible: {
        borderColor: '_component.keyboardFocused.outerFocusRing',
        boxShadow: [
          `inset 0 0 0 ${theme.sizes['1q']} ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
          `inset 0 0 0 ${theme.sizes['2q']} ${theme.get('colors._component.keyboardFocused.innerFocusRing')}`,
        ].join(', '),
        outline: 'none',
      },
    },
  };
};

const useDropdownChipCloseButtonStyle = () => {
  const theme = useTheme();
  const borderWidth = theme.sizes['1q'];

  return {
    position: 'absolute',
    right: `calc(${theme.sizes['2x']} - ${borderWidth})`, // align with the pill's own horizontal padding
    top: '50%',
    transform: 'translateY(-50%)',
  };
};

export {
  getDropdownContentStyle,
  useDropdownButtonStyle,
  useDropdownChipCloseButtonStyle,
  useDropdownChipPillStyle,
  useDropdownChipRootStyle,
};

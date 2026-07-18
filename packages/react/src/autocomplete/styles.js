import { useMenuItemStyle, useMenuListStyle } from '../menu/styles';

const useAutocompleteStyle = () => {
  return {
    position: 'relative',
    width: '100%',
  };
};

// Content sizing behavior:
// - `{inputWidth}` is the input's `offsetWidth`
// - `{contentWidth}` is `slotProps.content.width`
//
// Behavior         | minWidth       | width                              | maxWidth | maxHeight | zIndex
// -----------------|----------------|------------------------------------|----------|-----------|---------
// `matchWidth` set | —              | `{inputWidth} ?? 'max-content'`    | —        | 40vh      | popover (portalled) / — (default)
// Default behavior | `{inputWidth}` | `{contentWidth} ?? 'max-content'`  | 640px    | 40vh      | popover (portalled) / — (default)
//
// Note: `maxHeight: '40vh'` follows MUI's approach. It scales with the viewport, helping the popup fit within smaller screens (e.g. laptops) without overflowing, while still allowing more content to be visible on larger displays. A fixed height tends to either overflow on small viewports or underutilize space on larger ones.
const useAutocompleteListStyle = ({ portalled, matchWidth, contentWidth, inputWidth } = {}) => {
  const menuListStyle = useMenuListStyle();
  const base = {
    ...menuListStyle,
    maxHeight: '40vh',
    overflowY: 'auto',
    ...(portalled && { zIndex: 'popover' }),
  };
  if (matchWidth) {
    return {
      ...base,
      width: inputWidth ?? 'max-content',
    };
  }
  return {
    ...base,
    minWidth: inputWidth,
    maxWidth: 640,
    width: contentWidth ?? 'max-content',
  };
};

const useAutocompleteItemStyle = ({ tabIndex, disabled }) => {
  const menuItemStyle = useMenuItemStyle({ tabIndex });
  return {
    ...menuItemStyle,
    // The `[data-highlighted]` selector extends the hover state to support keyboard-driven highlighting (the hook applies this attribute via `getItemProps`)
    '&[data-highlighted]': {
      backgroundColor: 'actions.hovered',
    },
    // The `disabled` flag enforces the disabled palette, cursor, and pointer-events lockout
    ...(disabled && {
      color: 'text.disabled',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    }),
  };
};

export {
  useAutocompleteItemStyle,
  useAutocompleteListStyle,
  useAutocompleteStyle,
};

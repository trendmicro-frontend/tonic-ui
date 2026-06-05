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
const getMenuListStyle = ({ portalled, matchWidth, contentWidth, toggleWidth }) => {
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

export {
  getMenuListStyle,
};

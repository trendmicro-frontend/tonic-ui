// Cap the popup at `40vh` so a long list doesn't extend beyond the viewport.
// Override via `slotProps.content.maxHeight`.
//
// Behavior   | minWidth    | width                         | maxWidth | maxHeight | zIndex
// -----------|-------------|-------------------------------|----------|-----------|---------
// portalled  | toggleWidth | contentWidth (passthrough)    | 640px    | 40vh      | popover
// fit-toggle | —           | toggleWidth                   | 640px    | 40vh      | —
// default    | toggleWidth | contentWidth ?? 'max-content' | 640px    | 40vh      | —
const getMenuListStyle = ({ portalled, contentWidth, toggleWidth }) => {
  const base = {
    maxHeight: '40vh',
    overflowY: 'auto',
    maxWidth: 640,
  };
  if (portalled) {
    return {
      ...base,
      zIndex: 'popover',
      minWidth: toggleWidth,
      width: contentWidth,
    };
  }
  if (contentWidth === 'fit-toggle') {
    return {
      ...base,
      width: toggleWidth,
    };
  }
  return {
    ...base,
    minWidth: toggleWidth,
    width: contentWidth ?? 'max-content',
  };
};

export {
  getMenuListStyle,
};

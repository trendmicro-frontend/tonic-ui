const useAccessibleButtonRootStyle = ({ cursor, disabled }) => {
  return {
    cursor: cursor ?? (disabled ? 'not-allowed' : undefined),
  };
};

const useAccessibleButtonBaseStyle = ({ disabled }) => {
  return {
    display: 'inline-flex', // or 'inline-block' as it is the default button display style
    pointerEvents: disabled ? 'none' : 'auto',
    cursor: 'pointer',
    userSelect: 'none',
  };
};

export {
  useAccessibleButtonRootStyle,
  useAccessibleButtonBaseStyle,
};

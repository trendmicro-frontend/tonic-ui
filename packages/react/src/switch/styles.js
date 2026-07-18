const useSwitchStyle = ({ disabled, readOnly }) => {
  let cursor = 'pointer';
  if (disabled) {
    cursor = 'not-allowed';
  } else if (readOnly) {
    cursor = 'default';
  }
  return {
    display: 'inline-flex',
    verticalAlign: 'top',
    alignItems: 'center',
    cursor,
  };
};

const useSwitchControlBoxStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    userSelect: 'none',
  };
};

export {
  useSwitchStyle,
  useSwitchControlBoxStyle,
};

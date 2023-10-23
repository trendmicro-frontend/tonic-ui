const useRadioStyle = ({ disabled }) => {
  return {
    display: 'inline-flex',
    verticalAlign: 'top',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
};

const useRadioControlBoxStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    userSelect: 'none',
  };
};

export {
  useRadioStyle,
  useRadioControlBoxStyle,
};

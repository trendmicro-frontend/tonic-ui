const useButtonBoxStyle = ({ disabled }) => {
  return {
    display: 'inline-block',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };
};

export {
  useButtonBoxStyle,
};

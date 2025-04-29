const useFlexItemStyle = ({ fixed }) => {
  return {
    display: 'block', // Use block display to allow text truncation with ellipsis
    flex: fixed ? 'none' : 'auto',
    maxWidth: fixed ? '100%': undefined,
  };
};

export {
  useFlexItemStyle,
};

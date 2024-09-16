const useVisuallyHiddenStyle = () => {
  return {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    border: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  };
};

export {
  useVisuallyHiddenStyle,
};

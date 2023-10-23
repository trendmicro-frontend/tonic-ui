const useIconButtonStyle = ({
  color,
  size = '8x',
}) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    width: size,
    height: size,
  };
};

export {
  useIconButtonStyle,
};

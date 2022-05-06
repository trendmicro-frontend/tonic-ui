const useStackStyle = ({
  direction,
  spacing,
}) => {
  return {
    display: 'flex',
    flexDirection: direction,
    ...((direction === 'column' || direction === 'column-reverse') && {
      rowGap: spacing,
    }),
    ...((direction === 'row' || direction === 'row-reverse') && {
      columnGap: spacing,
    }),
  };
};

const useStackItemStyle = () => {
  return {
    display: 'inline-block',
  };
};

export {
  useStackStyle,
  useStackItemStyle,
};

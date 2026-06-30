const usePaginationStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
};

const usePaginationItemStyle = ({ type }) => {
  const selectedBackgroundColor = '_foreground.subtle.selected';
  const sizeStyle = (({ type }) => {
    // page button
    if (type === 'page') {
      return {
        px: '2x',
        minWidth: '8x',
      };
    }

    // first, last, previous, next, start-ellipsis, end-ellipsis buttons
    return {
      px: '2x',
      width: '8x',
    };
  })({ type });

  return {
    ...sizeStyle,
    transition: 'none', // avoid unwanted transition effects on buttons
    _selected: {
      backgroundColor: selectedBackgroundColor,
    },
  };
};

export {
  usePaginationStyle,
  usePaginationItemStyle,
};

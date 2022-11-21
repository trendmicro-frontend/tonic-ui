import { useColorMode } from '../color-mode';

const usePaginationStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
};

const usePaginationItemStyle = ({ type }) => {
  const [colorMode] = useColorMode();
  const selectedBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
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
      borderColor: selectedBorderColor,
    },
  };
};

export {
  usePaginationStyle,
  usePaginationItemStyle,
};

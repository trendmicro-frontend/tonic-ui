import { useColorMode } from '../color-mode';

const useTableStyle = props => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
  };
};

const useTableCellStyle = ({ size, variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const px = '3x';
  const py = {
    lg: '3x',
    md: '2x',
    sm: '1x',
  }[size];

  return {
    borderRight: (variant === 'outline') ? 1 : undefined,
    borderBottom: 1,
    borderColor,
    color,
    px,
    py,
  };
};

const useTableHeaderCellStyle = ({ size, variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];
  const px = '3x';
  const py = {
    lg: '3x',
    md: '2x',
    sm: '1x',
  }[size];

  return {
    borderRight: (variant === 'outline') ? 1 : undefined,
    borderBottom: 2,
    borderColor,
    color,
    fontWeight: 'semibold',
    px,
    py,
  };
};

const useTableHeaderRowStyle = props => {
  return {
    display: 'flex',
  };
};

const useTableHeaderStyle = props => {
  return {
    overflow: 'hidden',
    flex: '0 0 auto',
  };
};

const useTableRowStyle = props => {
  return {
    display: 'flex',
  };
};

const useTableScrollbarTrackStyle = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return {
    backgroundColor,
  };
};

export {
  useTableStyle,
  useTableCellStyle,
  useTableHeaderCellStyle,
  useTableHeaderRowStyle,
  useTableHeaderStyle,
  useTableRowStyle,
  useTableScrollbarTrackStyle,
};

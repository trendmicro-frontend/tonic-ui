import { sx } from '@tonic-ui/styled-system';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useTableStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

const useTableHeaderStyle = () => {
  return {
    flex: 'none',
    overflow: 'hidden',
  };
};

const useTableHeaderRowStyle = () => {
  return {
    display: 'flex',
  };
};

const useTableHeaderCellStyle = ({ size, variant }) => {
  const { sizes } = useTheme();
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
    'sm': '1x',
    'md': '2x',
    'lg': '3x',
  }[size];

  if (variant === 'outline') {
    return {
      borderTop: 1,
      borderTopColor: borderColor,
      borderBottom: 2,
      borderBottomColor: borderColor,
      borderLeft: 1,
      borderLeftColor: borderColor,
      color,
      fontWeight: 'semibold',
      px,
      pt: `calc(${sizes[py]} - ${sizes['1q']})`,
      pb: `calc(${sizes[py]} - ${sizes['2q']})`,
      _lastChild: {
        borderRight: 1,
        borderRightColor: borderColor,
      },
    };
  }

  return {
    borderBottom: 2,
    borderBottomColor: borderColor,
    color,
    fontWeight: 'semibold',
    px,
    pt: py,
    pb: `calc(${sizes[py]} - ${sizes['2q']})`,
  };
};

const useTableBodyStyle = () => {
  return {
  };
};

const useTableRowCSS = ({ role, variant }) => {
  if (variant === 'outline') {
    const selector = `[role=${role}] + &[role=${role}] > *`;
    return sx({
      [selector]: {
        borderTopColor: 'transparent',
      },
    });
  }

  return {};
};

const useTableRowStyle = () => {
  return {
    display: 'flex',
  };
};

const useTableCellStyle = ({ size, variant }) => {
  const { sizes } = useTheme();
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
    'sm': '1x',
    'md': '2x',
    'lg': '3x',
  }[size];

  if (variant === 'outline') {
    return {
      borderBottom: 1,
      borderBottomColor: borderColor,
      borderLeft: 1,
      borderLeftColor: borderColor,
      color,
      px,
      pt: py,
      pb: `calc(${sizes[py]} - ${sizes['1q']})`,
      _lastChild: {
        borderRight: 1,
        borderRightColor: borderColor,
      },
    };
  }

  return {
    borderBottom: 1,
    borderBottomColor: borderColor,
    color,
    px,
    pt: py,
    pb: `calc(${sizes[py]} - ${sizes['1q']})`,
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
  useTableHeaderStyle,
  useTableHeaderRowStyle,
  useTableHeaderCellStyle,
  useTableBodyStyle,
  useTableCellStyle,
  useTableRowCSS,
  useTableRowStyle,
  useTableScrollbarTrackStyle,
};

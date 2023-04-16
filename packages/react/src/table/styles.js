import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useTableStyle = ({ variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const variantStyle = {
    'outline': {
      border: 1,
      borderColor,
    },
  }[variant];

  return {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    ...variantStyle,
  };
};

const useTableHeaderStyle = () => {
  return {
    flex: 'none',
    overflow: 'hidden',
  };
};

const useTableBodyStyle = () => {
  return {
  };
};

const useTableHeaderRowStyle = ({ size }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return {
    borderBottom: 2,
    borderColor,
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
  const pt = {
    'sm': '1x',
    'md': '2x',
    'lg': '3x',
  }[size];
  const pb = {
    'sm': `calc(${sizes['1x']} - ${sizes['2q']})`,
    'md': `calc(${sizes['2x']} - ${sizes['2q']})`,
    'lg': `calc(${sizes['3x']} - ${sizes['2q']})`,
  }[size];
  const variantStyle = {
    'outline': {
      _notLastOfType: {
        borderRight: 1,
        borderColor,
      },
    },
  }[variant];

  return {
    color,
    fontWeight: 'semibold',
    px,
    pt,
    pb,
    ...variantStyle,
  };
};

const useTableRowStyle = ({ size, variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const variantStyle = {
    'outline': {
      _lastOfType: {
        borderBottomColor: 'transparent',
      },
    },
  }[variant];

  return {
    borderBottom: 1,
    borderColor,
    display: 'flex',
    ...variantStyle,
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
  const pt = {
    'sm': '1x',
    'md': '2x',
    'lg': '3x',
  }[size];
  const pb = {
    'sm': `calc(${sizes['1x']} - ${sizes['1q']})`,
    'md': `calc(${sizes['2x']} - ${sizes['1q']})`,
    'lg': `calc(${sizes['3x']} - ${sizes['1q']})`,
  }[size];
  const variantStyle = {
    'outline': {
      _notLastOfType: {
        borderRight: 1,
        borderColor,
      },
    },
  }[variant];

  return {
    color,
    px,
    pt,
    pb,
    ...variantStyle,
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
  useTableBodyStyle,
  useTableHeaderRowStyle,
  useTableHeaderCellStyle,
  useTableRowStyle,
  useTableCellStyle,
  useTableScrollbarTrackStyle,
};

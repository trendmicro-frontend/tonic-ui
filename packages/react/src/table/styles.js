import { sx } from '@tonic-ui/styled-system';
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

const useTableHeaderRowStyle = () => {
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

const useTableHeaderCellCSS = ({ variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  if (variant === 'outline') {
    return sx({
      '[role="columnheader"] + &[role="columnheader"]': {
        borderLeft: 1,
        borderColor,
      },
    });
  }

  return {};
};

const useTableHeaderCellStyle = ({ size }) => {
  const { sizes } = useTheme();
  const [colorMode] = useColorMode();
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

  return {
    color,
    fontWeight: 'semibold',
    px,
    pt,
    pb,
  };
};

const useTableRowStyle = ({ variant }) => {
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

const useTableCellCSS = ({ variant }) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  if (variant === 'outline') {
    return sx({
      '[role="cell"] + &[role="cell"]': {
        borderLeft: 1,
        borderColor,
      },
    });
  }

  return {};
};

const useTableCellStyle = ({ size }) => {
  const { sizes } = useTheme();
  const [colorMode] = useColorMode();
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

  return {
    color,
    px,
    pt,
    pb,
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
  useTableHeaderCellCSS,
  useTableHeaderCellStyle,
  useTableRowStyle,
  useTableCellCSS,
  useTableCellStyle,
  useTableScrollbarTrackStyle,
};

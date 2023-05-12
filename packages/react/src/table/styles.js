import { sx } from '@tonic-ui/styled-system';
import { useMemo } from 'react';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { LAYOUT_TABLE } from './constants';

const useTableStyle = ({ layout }) => {
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'table',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        display: 'table',
      };
    }

    return {
      display: 'inline-flex',
      flexDirection: 'column',
    };
  }, [layout]);

  return {
    ...layoutStyle,
  };
};

const useTableHeaderStyle = ({ layout }) => {
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'thead',
        display: 'table-header-group',
      };
    }

    return {
      flex: 'none',
    };
  }, [layout]);

  return {
    ...layoutStyle,
  };
};

const useTableHeaderRowStyle = ({ layout }) => {
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'tr',
        display: 'table-row',
      };
    }

    return {
      display: 'flex',
      width: 'fit-content',
    };
  }, [layout]);

  return {
    ...layoutStyle,
  };
};

const useTableHeaderCellStyle = ({ layout, size, variant }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'th',
        display: 'table-cell',
        textAlign: 'start', // override the default center alignment
      };
    }

    return {};
  }, [layout]);
  const visualStyle = useMemo(() => {
    const { sizes } = theme;
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
    const width = 150;

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
        width,
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
      width,
    };
  }, [theme, colorMode, size, variant]);

  return {
    ...layoutStyle,
    ...visualStyle,
  };
};

const useTableBodyStyle = ({ layout }) => {
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'tbody',
        display: 'table-row-group',
      };
    }

    return {};
  }, [layout]);

  return {
    ...layoutStyle,
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

const useTableRowStyle = ({ layout }) => {
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'tr',
        display: 'table-row',
      };
    }

    return {
      display: 'flex',
      width: 'fit-content',
    };
  }, [layout]);

  return {
    ...layoutStyle,
  };
};

const useTableCellStyle = ({ layout, size, variant }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const layoutStyle = useMemo(() => {
    if (layout === LAYOUT_TABLE) {
      return {
        as: 'td',
        display: 'table-cell',
      };
    }

    return {};
  }, [layout]);
  const visualStyle = useMemo(() => {
    const { sizes } = theme;
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
    const width = 150;

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
        width,
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
      width,
    };
  }, [theme, colorMode, size, variant]);

  return {
    ...layoutStyle,
    ...visualStyle,
  };
};

const useTableColumnResizeHandleStyle = ({ isResizing }) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const borderColor = {
    dark: 'gray:50',
    light: 'gray:70',
  }[colorMode];
  const resizeHandleStyle = {
    backgroundColor,
    borderLeftColor: borderColor,
  };

  return {
    borderLeft: 1,
    borderLeftColor: 'transparent',
    boxSizing: 'content-box',
    cursor: 'col-resize',
    height: '100%',
    touchAction: 'none',
    userSelect: 'none',
    width: '1x',
    ...(isResizing && resizeHandleStyle),
    _hover: {
      ...resizeHandleStyle,
    },
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
  useTableRowCSS,
  useTableRowStyle,
  useTableCellStyle,
  useTableColumnResizeHandleStyle,
  useTableScrollbarTrackStyle,
};

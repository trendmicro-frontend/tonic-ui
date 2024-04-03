import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE, VARIANT_OUTLINE } from './constants';

const useTableStyle = ({ layout }) => {
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        display: 'table',
      };
    }

    return {
      display: 'inline-flex',
      flexDirection: 'column',
    };
  })();

  return {
    ...layoutStyle,
  };
};

const useTableHeaderStyle = ({ layout }) => {
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-header-group',
      };
    }

    return {
      flex: 'none',
    };
  })();

  return {
    ...layoutStyle,
  };
};

const useTableBodyStyle = ({ layout }) => {
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-row-group',
      };
    }

    return {};
  })();

  return {
    ...layoutStyle,
  };
};

const useTableFooterStyle = ({ layout }) => {
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-footer-group',
      };
    }

    return {
      flex: 'none',
    };
  })();

  return {
    ...layoutStyle,
  };
};

const useTableRowStyle = ({ groupVariant, layout, role, variant }) => {
  // HEADER
  if (groupVariant === GROUP_VARIANT_HEADER) {
    const layoutStyle = (() => {
      if (layout === LAYOUT_TABLE) {
        return {
          display: 'table-row',
        };
      }

      return {
        display: 'flex',
        width: 'fit-content',
      };
    })();

    return {
      ...layoutStyle,
    };
  }

  // BODY & FOOTER
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-row',
      };
    }

    return {
      display: 'flex',
      width: 'fit-content',
    };
  })();

  const variantStyle = (() => {
    if (variant === VARIANT_OUTLINE) {
      const selector = `[role=${role}] + &[role=${role}] > *`;
      return {
        [selector]: {
          borderTopColor: 'transparent',
        },
      };
    }

    return {};
  })();

  return {
    ...layoutStyle,
    ...variantStyle,
  };
};

const useTableCellStyle = ({ groupVariant, layout, size, variant }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();

  // HEADER
  if (groupVariant === GROUP_VARIANT_HEADER) {
    const layoutStyle = (() => {
      if (layout === LAYOUT_TABLE) {
        return {
          display: 'table-cell',
          textAlign: 'start', // override the default center alignment
        };
      }

      return {};
    })();
    const visualStyle = (() => {
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

      if (variant === VARIANT_OUTLINE) {
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
    })();

    return {
      ...layoutStyle,
      ...visualStyle,
    };
  }

  // BODY & FOOTER
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-cell',
      };
    }

    return {};
  })();
  const visualStyle = (() => {
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

    if (variant === VARIANT_OUTLINE) {
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
  })();

  return {
    ...layoutStyle,
    ...visualStyle,
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
  useTableFooterStyle,
  useTableRowStyle,
  useTableCellStyle,
  useTableScrollbarTrackStyle,
};

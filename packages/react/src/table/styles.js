import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE, VARIANT_OUTLINE } from './constants';

const useTableStyle = ({ layout, variant }) => {
  const [colorMode] = useColorMode();

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

  const variantStyle = (() => {
    if (variant === VARIANT_OUTLINE) {
      const borderColor = {
        dark: 'gray:70',
        light: 'gray:30',
      }[colorMode];
      return {
        border: 1,
        borderColor,
      };
    }

    return {};
  })();

  return {
    ...layoutStyle,
    ...variantStyle,
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
  // HEADER | BODY | FOOTER
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
    const variantStyle = (() => {
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
          borderBottom: 2,
          borderBottomColor: borderColor,
          borderLeft: 1,
          borderLeftColor: borderColor,
          color,
          fontWeight: 'semibold',
          px,
          pt: py,
          pb: `calc(${sizes[py]} - ${sizes['2q']})`,
          width,
          _firstChild: {
            borderLeft: 0,
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
      ...variantStyle,
    };
  }

  // BODY | FOOTER
  const layoutStyle = (() => {
    if (layout === LAYOUT_TABLE) {
      return {
        display: 'table-cell',
      };
    }

    return {};
  })();
  const variantStyle = (() => {
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
        _firstChild: {
          borderLeft: 0,
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
  useTableFooterStyle,
  useTableRowStyle,
  useTableCellStyle,
  useTableScrollbarTrackStyle,
};

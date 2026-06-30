import {
  Grid,
  useTheme,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  ensureArray,
} from 'ensure-type';
import _get from 'lodash/get';
import _has from 'lodash/has';
import ColorStyleBlock from './ColorStyleBlock';

const baseWidth = 180;

const ColorStyleBody = ({
  colorStyle: customColorStyle = {},
  colorType,
  ...props
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorStyleOfType = _get(customColorStyle, colorType) ?? _get(colorStyle, colorType);

  // Helper function to resolve theme color values (handles v4 semantic token format)
  const resolveThemeColor = (tokenPath) => {
    // Split token path by dots for proper lodash.get access
    // e.g., 'purple.600' -> ['colors', 'purple', '600']
    const pathArray = ['colors', ...tokenPath.split('.')];
    const colorValue = _get(theme, pathArray);

    // If the color value is an object with _dark/_light, resolve based on colorMode
    if (colorValue && typeof colorValue === 'object' && !Array.isArray(colorValue)) {
      if ('_dark' in colorValue || '_light' in colorValue) {
        return colorValue[`_${colorMode}`];
      }
    }
    return colorValue;
  };

  const colorStyleBlocks = (() => {
    if (typeof colorStyleOfType === 'object') {
      return Object.keys(colorStyleOfType).map(colorKey => {
        const colorLabel = Array.isArray(colorStyleOfType)
          ? ''
          : `${colorType}.${colorKey}`;
        const originalColorValue = _get(customColorStyle, `${colorType}.${colorKey}`) ?? _get(colorStyle, `${colorType}.${colorKey}`);

        const colorTokens = ensureArray(originalColorValue).map(x => {
          // Check if token exists in theme.colors by splitting the path
          if (typeof x !== 'string') {
            return null;
          }
          const pathArray = ['colors', ...x.split('.')];
          return _has(theme, pathArray) ? x : null;
        });
        const colorValues = ensureArray(originalColorValue).map(x => {
          return typeof x === 'string' ? (resolveThemeColor(x) ?? x) : x;
        });

        if (Array.isArray(colorStyleOfType)) {
          colorKey = '#' + (Number(colorKey) + 1);
        }

        /**
         * Example:
         *
         * {
         *   background: {
         *     secondary: 'background.high',
         *   }
         * }
         *
         * colorLabel = 'background.secondary'
         * colorType  = 'background'
         * colorKey   = 'secondary'
         * colorTokens = ['background.high']
         * colorValues = ['#212121']
         */
        return {
          colorLabel,
          colorType,
          colorKey,
          colorTokens,
          colorValues,
        };
      });
    }

    return [{
      colorLabel: colorType,
      colorType,
      colorKey: colorType,
      colorTokens: [(() => {
        if (typeof colorStyleOfType !== 'string') {
          return null;
        }
        const pathArray = ['colors', ...colorStyleOfType.split('.')];
        return _has(theme, pathArray) ? colorStyleOfType : null;
      })()],
      colorValues: [typeof colorStyleOfType === 'string' ? (resolveThemeColor(colorStyleOfType) ?? colorStyleOfType) : colorStyleOfType],
    }];
  })();

  return (
    <Grid
      rowGap="8x"
      columnGap="12x"
      templateColumns={`repeat(auto-fill, minmax(${baseWidth}px, 1fr))`}
      {...props}
    >
      {colorStyleBlocks.map(({ colorLabel, colorType, colorKey, colorTokens, colorValues }) => {
        return (
          <ColorStyleBlock
            key={colorKey}
            colorLabel={colorLabel}
            colorType={colorType}
            colorTokens={colorTokens}
            colorValues={colorValues}
          />
        );
      })}
    </Grid>
  );
};

export default ColorStyleBody;

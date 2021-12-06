import {
  Grid,
  useTheme,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  ensureArray,
  ensureString,
} from 'ensure-type';
import _get from 'lodash/get';
import _has from 'lodash/has';
import React from 'react';
import ColorStyleBlock from './ColorStyleBlock';

const capitalizeFirstLetter = string => {
  string = ensureString(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const baseWidth = 120;

const ColorStyleBody = ({
  colorStyle: customColorStyle = {},
  colorType,
  ...props
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorStyleOfType = _get(customColorStyle, colorType) ?? _get(colorStyle, colorType);

  { // TODO: remove this block in the v1 release
    // filter out deprecated keys
    if (colorType === 'background') {
      delete colorStyleOfType.selected;
      delete colorStyleOfType.marked;
    }

    // filter out deprecated keys
    if (colorType === 'text') {
      delete colorStyleOfType.emphasis;
      delete colorStyleOfType.primary;
      delete colorStyleOfType.secondary;
      delete colorStyleOfType.tertiary;
      delete colorStyleOfType.disabled;
      delete colorStyleOfType.link;
      delete colorStyleOfType.warning;
      delete colorStyleOfType.error;
    }
  }

  const colorStyleBlocks = Object.keys(colorStyleOfType)
    .map(colorKey => {
      const colorLabel = capitalizeFirstLetter(colorKey);
      const originalColorValue = _get(customColorStyle, `${colorType}.${colorKey}`) ?? _get(colorStyle, `${colorType}.${colorKey}`);
      const colorTokens = ensureArray(originalColorValue).map(x => {
        return _has(theme, ['colors', x]) ? x : null;
      });
      const colorValues = ensureArray(originalColorValue).map(x => {
        return _get(theme, ['colors', x]) ?? x;
      });

      if (Array.isArray(colorStyleOfType)) {
        colorKey = '#' + (Number(colorKey) + 1);
      }

      /**
       * Example:
       *
       * {
       *   background: {
       *     secondary: 'gray:90',
       *   }
       * }
       *
       * colorLabel = 'Secondary'
       * colorType  = 'background'
       * colorKey   = 'secondary'
       * colorTokens = ['gray:90']
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
            colorKey={colorKey}
            colorTokens={colorTokens}
            colorValues={colorValues}
          />
        );
      })}
    </Grid>
  );
};

export default ColorStyleBody;

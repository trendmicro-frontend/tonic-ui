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
import React from 'react';
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
  const colorStyleBlocks = (() => {
    if (typeof colorStyleOfType === 'object') {
      return Object.keys(colorStyleOfType).map(colorKey => {
        const colorLabel = Array.isArray(colorStyleOfType)
          ? ''
          : `${colorType}.${colorKey}`;
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
         * colorLabel = 'background.secondary'
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
    }

    return [{
      colorLabel: colorType,
      colorType,
      colorKey: colorType,
      colorTokens: [_has(theme, ['colors', colorStyleOfType]) ? colorStyleOfType : null],
      colorValues: [_get(theme, ['colors', colorStyleOfType]) ?? colorStyleOfType],
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

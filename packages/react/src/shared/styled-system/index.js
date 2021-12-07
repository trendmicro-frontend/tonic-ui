import { ensureArray } from 'ensure-type';
import {
  compose,
  system,
} from 'styled-system';
import background from './background';
import border from './border';
import color from './color';
import config from './config';
import flexbox from './flexbox';
import grid from './grid';
import layout from './layout';
import position from './position';
import shadow from './shadow';
import space from './space';
import typography from './typography';

export const combinedStyleProps = compose(
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  system(config),
);

export const stylePropNames = ensureArray(combinedStyleProps.propNames);

export const stylePropMap = stylePropNames.reduce((acc, val) => {
  acc[val] = true;
  return acc;
}, {});

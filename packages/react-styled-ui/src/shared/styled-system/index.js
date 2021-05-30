import { ensureArray } from 'ensure-type';
import {
  background,
  border,
  color,
  flexbox,
  grid,
  position,
  shadow,
  space,
  typography,
  compose,
  system,
} from 'styled-system';
import config from './config';
import layout from './layout';

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

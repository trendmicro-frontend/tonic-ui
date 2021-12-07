import { ensureArray } from 'ensure-type';
import { compose } from 'styled-system';
import animation from './config/animation';
import background from './config/background';
import border from './config/border';
import color from './config/color';
import containment from './config/containment';
import effect from './config/effect';
import flexbox from './config/flexbox';
import grid from './config/grid';
import interactivity from './config/interactivity';
import layout from './config/layout';
import listStyle from './config/list-style';
import margin from './config/margin';
import padding from './config/padding';
import position from './config/position';
import textDecoration from './config/text-decoration';
import transform from './config/transform';
import transition from './config/transition';
import typography from './config/typography';

export const combinedStyleProps = compose(
  animation,
  background,
  border,
  color,
  containment,
  effect,
  flexbox,
  grid,
  interactivity,
  layout,
  listStyle,
  margin,
  padding,
  position,
  textDecoration,
  transform,
  transition,
  typography,
);

export const stylePropNames = ensureArray(combinedStyleProps.propNames);

export const stylePropMap = stylePropNames.reduce((acc, val) => {
  acc[val] = true;
  return acc;
}, {});

import { ensureArray } from 'ensure-type';
import animation from './config/animation';
import background from './config/background';
import border from './config/border';
import color from './config/color';
import containment from './config/containment';
import effect from './config/effect';
import flexbox from './config/flexbox';
import gap from './config/gap';
import grid from './config/grid';
import interactivity from './config/interactivity';
import layout from './config/layout';
import listStyle from './config/list-style';
import margin from './config/margin';
import outline from './config/outline';
import padding from './config/padding';
import position from './config/position';
import textDecoration from './config/text-decoration';
import transform from './config/transform';
import transition from './config/transition';
import typography from './config/typography';
import compose from './core/compose';

export const combinedStyleProps = compose(
  animation,
  background,
  border,
  color,
  containment,
  effect,
  flexbox,
  gap,
  grid,
  interactivity,
  layout,
  listStyle,
  margin,
  outline,
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

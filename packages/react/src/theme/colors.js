import Color from 'color';

export const setColorWithOpacity = (color, opacity) => {
  return Color(color)
    .fade(1 - opacity)
    .rgb()
    .string();
};

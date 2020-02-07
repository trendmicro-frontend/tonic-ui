import Color from 'color';

export const addOpacity = (color, opacity) => {
  return Color(color)
    .fade(1 - opacity)
    .rgb()
    .string();
};

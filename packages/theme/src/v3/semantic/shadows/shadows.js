// semantic/shadows/shadows.js
export const shadows = {
  low: {
    main: '{low.down}',
    down: {
      _dark: '0px 4px 8px 0px {colors._shadow.low._dark}',
      _light: '0px 4px 8px 0px {colors._shadow.low._light}',
    },
    up: {
      _dark: '0px -4px 8px 0px {colors._shadow.low._dark}',
      _light: '0px -4px 8px 0px {colors._shadow.low._light}',
    },
    left: {
      _dark: '-4px 0px 8px 0px {colors._shadow.low._dark}',
      _light: '-4px 0px 8px 0px {colors._shadow.low._light}',
    },
    right: {
      _dark: '4px 0px 8px 0px {colors._shadow.low._dark}',
      _light: '4px 0px 8px 0px {colors._shadow.low._light}',
    },
  },
  medium: {
    main: '{medium.down}',
    down: {
      _dark: '0px 8px 16px 0px {colors._shadow.medium._dark}',
      _light: '0px 8px 16px 0px {colors._shadow.medium._light}',
    },
    up: {
      _dark: '0px -8px 16px 0px {colors._shadow.medium._dark}',
      _light: '0px -8px 16px 0px {colors._shadow.medium._light}',
    },
    left: {
      _dark: '-8px 0px 16px 0px {colors._shadow.medium._dark}',
      _light: '-8px 0px 16px 0px {colors._shadow.medium._light}',
    },
    right: {
      _dark: '8px 0px 16px 0px {colors._shadow.medium._dark}',
      _light: '8px 0px 16px 0px {colors._shadow.medium._light}',
    },
  },
  high: {
    main: '{high.down}',
    down: {
      _dark: '0px 10px 24px 0px {colors._shadow.high._dark}',
      _light: '0px 10px 24px 0px {colors._shadow.high._light}',
    },
    up: {
      _dark: '0px -10px 24px 0px {colors._shadow.high._dark}',
      _light: '0px -10px 24px 0px {colors._shadow.high._light}',
    },
    left: {
      _dark: '-10px 0px 24px 0px {colors._shadow.high._dark}',
      _light: '-10px 0px 24px 0px {colors._shadow.high._light}',
    },
    right: {
      _dark: '10px 0px 24px 0px {colors._shadow.high._dark}',
      _light: '10px 0px 24px 0px {colors._shadow.high._light}',
    },
  },
};

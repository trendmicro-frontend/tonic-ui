// semantic/colors/background.js
export const background = {
  highest: {
    _dark: '{black.300}',
    _light: '{white.150}'
  },
  high: {
    _dark: '{black.350}',
    _light: '{white.200}'
  },
  medium: {
    _dark: '{black.400}',
    _light: '{white.250}'
  },
  low: {
    _dark: '{black.500}',
    _light: '{white.350}'
  },
  _fixed: {
    dark: {
      highest: {
        _dark: '{background.highest}',
        _light: '{black.300}'
      },
      high: {
        _dark: '{background.high}',
        _light: '{black.350}'
      },
      medium: {
        _dark: '{background.medium}',
        _light: '{black.400}'
      },
      low: {
        _dark: '{background.low}',
        _light: '{black.500}'
      }
    },
    light: {
      highest: {
        _dark: '{white.150}',
        _light: '{background.highest}'
      },
      high: {
        _dark: '{white.200}',
        _light: '{background.high}'
      },
      medium: {
        _dark: '{white.250}',
        _light: '{background.medium}'
      },
      low: {
        _dark: '{white.350}',
        _light: '{background.low}'
      }
    }
  },
  _inverse: {
    highest: {
      _dark: '{background._fixed.light.highest}',
      _light: '{background._fixed.dark.highest}'
    },
    high: {
      _dark: '{background._fixed.light.high}',
      _light: '{background._fixed.dark.high}'
    },
    medium: {
      _dark: '{background._fixed.light.medium}',
      _light: '{background._fixed.dark.medium}'
    },
    low: {
      _dark: '{background._fixed.light.low}',
      _light: '{background._fixed.dark.low}'
    }
  }
};

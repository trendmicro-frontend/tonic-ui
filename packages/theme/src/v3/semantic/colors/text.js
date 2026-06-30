export const text = {
  accent: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 96%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 96%, transparent)'
  },
  primary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 80%, transparent)'
  },
  secondary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)'
  },
  tertiary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 56%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 56%, transparent)'
  },
  disabled: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 24%, transparent)'
  },
  _fixed: {
    dark: {
      accent: {
        _dark: '{text.accent}',
        _light: 'color-mix(in srgb, {colors.gray.100} 96%, transparent)'
      },
      primary: {
        _dark: '{text.primary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)'
      },
      secondary: {
        _dark: '{text.secondary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)'
      },
      tertiary: {
        _dark: '{text.tertiary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 56%, transparent)'
      },
      disabled: {
        _dark: '{text.disabled}',
        _light: 'color-mix(in srgb, {colors.gray.100} 24%, transparent)'
      }
    },
    light: {
      accent: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 96%, transparent)',
        _light: '{text.accent}'
      },
      primary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 80%, transparent)',
        _light: '{text.primary}'
      },
      secondary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)',
        _light: '{text.secondary}'
      },
      tertiary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 56%, transparent)',
        _light: '{text.tertiary}'
      },
      disabled: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 24%, transparent)',
        _light: '{text.disabled}'
      }
    }
  },
  _inverse: {
    accent: {
      _dark: '{text._fixed.light.accent}',
      _light: '{text._fixed.dark.accent}'
    },
    primary: {
      _dark: '{text._fixed.light.primary}',
      _light: '{text._fixed.dark.primary}'
    },
    secondary: {
      _dark: '{text._fixed.light.secondary}',
      _light: '{text._fixed.dark.secondary}'
    },
    tertiary: {
      _dark: '{text._fixed.light.tertiary}',
      _light: '{text._fixed.dark.tertiary}'
    },
    disabled: {
      _dark: '{text._fixed.light.disabled}',
      _light: '{text._fixed.dark.disabled}'
    }
  }
};

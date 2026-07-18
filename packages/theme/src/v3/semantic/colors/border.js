export const border = {
  accent: {
    _dark: '{gray.100}',
    _light: '{gray.1000}'
  },
  primary: {
    _dark: '{gray.400}',
    _light: '{gray.700}'
  },
  secondary: {
    _dark: '{gray.700}',
    _light: '{gray.400}'
  },
  tertiary: {
    _dark: '{gray.800}',
    _light: '{gray.250}'
  },
  subtle: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 12%, transparent)'
  },
  _primary: {
    enabled: {
      _dark: '{gray.600}',
      _light: '{gray.400}'
    },
    hovered: {
      _dark: '{blue.500}',
      _light: '{blue.500}'
    },
    active: {
      _dark: '{blue.600}',
      _light: '{blue.600}'
    },
    focused: {
      _dark: '{blue.600}',
      _light: '{blue.600}'
    },
    selected: {
      _dark: '{_foreground.primaryVariant.selected}',
      _light: '{_foreground.primaryVariant.selected}'
    },
    selectedHovered: {
      _dark: '{_foreground.primaryVariant.selectedHovered}',
      _light: '{_foreground.primaryVariant.selectedHovered}'
    },
    selectedDisabled: {
      _dark: '{_foreground.primaryVariant.selectedDisabled}',
      _light: '{_foreground.primaryVariant.selectedDisabled}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  _negative: {
    enabled: {
      _dark: '{_foreground.negative.enabled}',
      _light: '{_foreground.negative.enabled}'
    },
    hovered: {
      _dark: '{_foreground.negative.hovered}',
      _light: '{_foreground.negative.hovered}'
    },
    active: {
      _dark: '{_foreground.negative.active}',
      _light: '{_foreground.negative.active}'
    },
    disabled: {
      _dark: '{_foreground.negative.disabled}',
      _light: '{_foreground.negative.disabled}'
    }
  },
  _promotion: {
    enabled: {
      _dark: '{_foreground.promotion.enabled}',
      _light: '{_foreground.promotion.enabled}'
    },
    hovered: {
      _dark: '{_foreground.promotion.hovered}',
      _light: '{_foreground.promotion.hovered}'
    },
    active: {
      _dark: '{_foreground.promotion.active}',
      _light: '{_foreground.promotion.active}'
    },
    disabled: {
      _dark: '{_foreground.promotion.disabled}',
      _light: '{_foreground.promotion.disabled}'
    }
  },
  _fixed: {
    dark: {
      accent: {
        _dark: '{border.accent}',
        _light: '{gray.100}'
      },
      primary: {
        _dark: '{border.primary}',
        _light: '{gray.400}'
      },
      secondary: {
        _dark: '{border.secondary}',
        _light: '{gray.700}'
      },
      tertiary: {
        _dark: '{border.tertiary}',
        _light: '{gray.800}'
      },
      subtle: {
        _dark: '{border.subtle}',
        _light: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)'
      }
    },
    light: {
      accent: {
        _dark: '{gray.1000}',
        _light: '{border.accent}'
      },
      primary: {
        _dark: '{gray.700}',
        _light: '{border.primary}'
      },
      secondary: {
        _dark: '{gray.400}',
        _light: '{border.secondary}'
      },
      tertiary: {
        _dark: '{gray.250}',
        _light: '{border.tertiary}'
      },
      subtle: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 12%, transparent)',
        _light: '{border.subtle}'
      }
    }
  },
  _inverse: {
    accent: {
      _dark: '{border._fixed.light.accent}',
      _light: '{border._fixed.dark.accent}'
    },
    primary: {
      _dark: '{border._fixed.light.primary}',
      _light: '{border._fixed.dark.primary}'
    },
    secondary: {
      _dark: '{border._fixed.light.secondary}',
      _light: '{border._fixed.dark.secondary}'
    },
    tertiary: {
      _dark: '{border._fixed.light.tertiary}',
      _light: '{border._fixed.dark.tertiary}'
    },
    subtle: {
      _dark: '{border._fixed.light.subtle}',
      _light: '{border._fixed.dark.subtle}'
    }
  }
};

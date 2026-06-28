// semantic/colors/_foreground.js
export const _foreground = {
  primary: {
    enabled: {
      _dark: '{blue.650}',
      _light: '{blue.600}'
    },
    hovered: {
      _dark: '{blue.650.lighten.160}',
      _light: '{blue.600.darken.160}'
    },
    active: {
      _dark: '{blue.650.darken.80}',
      _light: '{blue.600.darken.320}'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.800} 48%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.250} 48%, transparent)'
    }
  },
  primaryVariant: {
    enabled: {
      _dark: '{_foreground.secondary.enabled}',
      _light: '{_foreground.secondary.enabled}'
    },
    hovered: {
      _dark: '{_foreground.secondary.hovered}',
      _light: '{_foreground.secondary.hovered}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    },
    selected: {
      _dark: '{_foreground.primary.enabled}',
      _light: '{_foreground.primary.enabled}'
    },
    selectedHovered: {
      _dark: '{_foreground.primary.hovered}',
      _light: '{_foreground.primary.hovered}'
    },
    selectedDisabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  secondary: {
    enabled: {
      _dark: '{gray.800}',
      _light: '{gray.250}'
    },
    hovered: {
      _dark: '{gray.800.lighten.160}',
      _light: '{gray.250.darken.80}'
    },
    active: {
      _dark: '{gray.800.darken.80}',
      _light: '{gray.250.darken.160}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  tertiary: {
    enabled: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 16%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 16%, transparent)'
    },
    hovered: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 28%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 28%, transparent)'
    },
    active: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 20%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 20%, transparent)'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 8%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 8%, transparent)'
    },
    selected: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 68%, transparent)'
    },
    selectedHovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 76%, transparent)'
    },
    selectedDisabled: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 24%, transparent)'
    }
  },
  subtle: {
    enabled: {
      _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
    },
    hovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
    },
    active: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 4%, transparent)'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
    },
    selected: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 20%, transparent)'
    },
    selectedHovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 24%, transparent)'
    },
    selectedDisabled: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)'
    }
  },
  negative: {
    enabled: {
      _dark: '{red.650}',
      _light: '{red.650}'
    },
    hovered: {
      _dark: '{red.650.lighten.160}',
      _light: '{red.650.darken.160}'
    },
    active: {
      _dark: '{red.650.darken.160}',
      _light: '{red.650.darken.320}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  promotion: {
    enabled: {
      _dark: '{purple.650}',
      _light: '{purple.600}'
    },
    hovered: {
      _dark: '{purple.650.lighten.160}',
      _light: '{purple.600.darken.160}'
    },
    active: {
      _dark: '{purple.650.darken.160}',
      _light: '{purple.600.darken.320}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  }
};

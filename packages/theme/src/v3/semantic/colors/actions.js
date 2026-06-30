export const actions = {
  enabled: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
  },
  hovered: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)'
  },
  active: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
  },
  selected: {
    _dark: 'color-mix(in srgb, {colors.blue.500} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.600} 8%, transparent)'
  },
  selectedHovered: {
    _dark: 'color-mix(in srgb, {colors.blue.500} 20%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.650} 16%, transparent)'
  },
  disabled: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
  },
  dragged: {
    _dark: 'color-mix(in srgb, {colors.blue.600} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.600} 12%, transparent)'
  },
  current: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
  },
  _fixed: {
    dark: {
      enabled: {
        _dark: '{actions.enabled}',
        _light: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)'
      },
      hovered: {
        _dark: '{actions.hovered}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      active: {
        _dark: '{actions.active}',
        _light: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)'
      },
      disabled: {
        _dark: '{actions.disabled}',
        _light: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)'
      },
      selected: {
        _dark: '{actions.selected}',
        _light: 'color-mix(in srgb, {colors.blue.800} 32%, transparent)'
      },
      selectedHovered: {
        _dark: '{actions.selectedHovered}',
        _light: 'color-mix(in srgb, {colors.blue.500} 16%, transparent)'
      },
      current: {
        _dark: '{actions.current}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      dragged: {
        _dark: '{actions.dragged}',
        _light: 'color-mix(in srgb, {colors.blue.600} 16%, transparent)'
      }
    },
    light: {
      enabled: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)',
        _light: '{actions.enabled}'
      },
      hovered: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)',
        _light: '{actions.hovered}'
      },
      active: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)',
        _light: '{actions.active}'
      },
      disabled: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)',
        _light: '{actions.disabled}'
      },
      selected: {
        _dark: 'color-mix(in srgb, {colors.blue.500} 12%, transparent)',
        _light: '{actions.selected}'
      },
      selectedHovered: {
        _dark: 'color-mix(in srgb, {colors.blue.500} 20%, transparent)',
        _light: '{actions.selectedHovered}'
      },
      current: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)',
        _light: '{actions.current}'
      },
      dragged: {
        _dark: 'color-mix(in srgb, {colors.blue.600} 12%, transparent)',
        _light: '{actions.dragged}'
      }
    }
  },
  _inverse: {
    enabled: {
      _dark: '{actions._fixed.light.enabled}',
      _light: '{actions._fixed.dark.enabled}'
    },
    hovered: {
      _dark: '{actions._fixed.light.hovered}',
      _light: '{actions._fixed.dark.hovered}'
    },
    active: {
      _dark: '{actions._fixed.light.active}',
      _light: '{actions._fixed.dark.active}'
    },
    disabled: {
      _dark: '{actions._fixed.light.disabled}',
      _light: '{actions._fixed.dark.disabled}'
    },
    selected: {
      _dark: '{actions._fixed.light.selected}',
      _light: '{actions._fixed.dark.selected}'
    },
    selectedHovered: {
      _dark: '{actions._fixed.light.selectedHovered}',
      _light: '{actions._fixed.dark.selectedHovered}'
    },
    current: {
      _dark: '{actions._fixed.light.current}',
      _light: '{actions._fixed.dark.current}'
    },
    dragged: {
      _dark: '{actions._fixed.light.dragged}',
      _light: '{actions._fixed.dark.dragged}'
    }
  }
};

// semantic/colors/_link.js
export const _link = {
  enabled: {
    _dark: '{blue.300}',
    _light: '{blue.700}'
  },
  hovered: {
    _dark: '{blue.200}',
    _light: '{blue.650}'
  },
  active: {
    _dark: '{blue.400}',
    _light: '{blue.800}'
  },
  visited: {
    _dark: '{purple.500}',
    _light: '{purple.650}'
  },
  disabled: {
    _dark: '{text.disabled}',
    _light: '{text.disabled}'
  },
  _fixed: {
    dark: {
      enabled: {
        _dark: '{_link.enabled}',
        _light: '{blue.300}'
      },
      hovered: {
        _dark: '{_link.hovered}',
        _light: '{blue.200}'
      },
      active: {
        _dark: '{_link.active}',
        _light: '{blue.400}'
      },
      visited: {
        _dark: '{_link.visited}',
        _light: '{purple.400}'
      },
      disabled: {
        _dark: '{text._fixed.dark.disabled}',
        _light: '{text._fixed.dark.disabled}'
      }
    },
    light: {
      enabled: {
        _dark: '{blue.700}',
        _light: '{_link.enabled}'
      },
      hovered: {
        _dark: '{blue.650}',
        _light: '{_link.hovered}'
      },
      active: {
        _dark: '{blue.800}',
        _light: '{_link.active}'
      },
      visited: {
        _dark: '{purple.700}',
        _light: '{_link.visited}'
      },
      disabled: {
        _dark: '{text._fixed.light.disabled}',
        _light: '{text._inverse.disabled}'
      }
    }
  },
  _inverse: {
    enabled: {
      _dark: '{_link._fixed.light.enabled}',
      _light: '{_link._fixed.dark.enabled}'
    },
    hovered: {
      _dark: '{_link._fixed.light.hovered}',
      _light: '{_link._fixed.dark.hovered}'
    },
    active: {
      _dark: '{_link._fixed.light.active}',
      _light: '{_link._fixed.dark.active}'
    },
    visited: {
      _dark: '{_link._fixed.dark.visited}',
      _light: '{_link._fixed.dark.visited}'
    },
    disabled: {
      _dark: '{_link._fixed.light.disabled}',
      _light: '{_link._fixed.dark.disabled}'
    }
  }
};

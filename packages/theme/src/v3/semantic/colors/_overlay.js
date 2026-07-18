export const _overlay = {
  thinest: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 4%, transparent)'
  },
  thinner: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)'
  },
  thin: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 16%, transparent)'
  },
  medium: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 40%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 40%, transparent)'
  },
  thick: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)'
  },
  thicker: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 72%, transparent)'
  },
  thickest: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 76%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 76%, transparent)'
  },
  inverse: {
    thinest: {
      _dark: '{_overlay._fixed.light.thinest}',
      _light: '{_overlay._fixed.dark.thinest}'
    },
    thinner: {
      _dark: '{_overlay._fixed.light.thinner}',
      _light: '{_overlay._fixed.dark.thinner}'
    },
    thin: {
      _dark: '{_overlay._fixed.light.thin}',
      _light: '{_overlay._fixed.dark.thin}'
    },
    medium: {
      _dark: '{_overlay._fixed.light.medium}',
      _light: '{_overlay._fixed.dark.medium}'
    },
    thick: {
      _dark: '{_overlay._fixed.light.thick}',
      _light: '{_overlay._fixed.dark.thick}'
    },
    thicker: {
      _dark: '{_overlay._fixed.light.thicker}',
      _light: '{_overlay._fixed.dark.thicker}'
    },
    thickest: {
      _dark: '{_overlay._fixed.light.thickest}',
      _light: '{_overlay._fixed.dark.thickest}'
    }
  },
  _fixed: {
    dark: {
      thinest: {
        _dark: '{_overlay.thinest}',
        _light: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)'
      },
      thinner: {
        _dark: '{_overlay.thinner}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      thin: {
        _dark: '{_overlay.thin}',
        _light: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)'
      },
      medium: {
        _dark: '{_overlay.medium}',
        _light: 'color-mix(in srgb, {colors.gray.100} 40%, transparent)'
      },
      thick: {
        _dark: '{_overlay.thick}',
        _light: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)'
      },
      thicker: {
        _dark: '{_overlay.thicker}',
        _light: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)'
      },
      thickest: {
        _dark: '{_overlay.thickest}',
        _light: 'color-mix(in srgb, {colors.gray.100} 76%, transparent)'
      }
    },
    light: {
      thinest: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 4%, transparent)',
        _light: '{_overlay.thinest}'
      },
      thinner: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)',
        _light: '{_overlay.thinner}'
      },
      thin: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 16%, transparent)',
        _light: '{_overlay.thin}'
      },
      medium: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 40%, transparent)',
        _light: '{_overlay.medium}'
      },
      thick: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)',
        _light: '{_overlay.thick}'
      },
      thicker: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 72%, transparent)',
        _light: '{_overlay.thicker}'
      },
      thickest: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 76%, transparent)',
        _light: '{_overlay.thickest}'
      }
    }
  }
};

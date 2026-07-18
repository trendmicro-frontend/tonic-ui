export const riskLevel = {
  high: {
    text: {
      _dark: '{red.500}',
      _light: '{red.700}'
    },
    chart: {
      _dark: '{red.550}',
      _light: '{red.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.red.600} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.red.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{red.200}',
        _light: '{red.700}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.high.chart}',
        _light: '{alert.riskLevel.high.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.red.550} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.red.550} 0%, transparent)'
      }
    }
  },
  medium: {
    text: {
      _dark: '{yellow.200}',
      _light: '{yellow.600}'
    },
    chart: {
      _dark: '{yellow.200}',
      _light: '{yellow.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.yellow.400} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.yellow.200} 24%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{yellow.100}',
        _light: '{yellow.600}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.medium.chart}',
        _light: '{alert.riskLevel.medium.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.yellow.200} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.yellow.500} 0%, transparent)'
      }
    }
  },
  low: {
    text: {
      _dark: '{green.400}',
      _light: '{green.650}'
    },
    chart: {
      _dark: '{green.400}',
      _light: '{green.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.green.500} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.green.200} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{green.100}',
        _light: '{green.700}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.low.chart}',
        _light: '{alert.riskLevel.low.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.green.400} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.green.500} 0%, transparent)'
      }
    }
  },
  uta: {
    text: {
      _dark: '{gray.350}',
      _light: '{gray.650}'
    },
    chart: {
      _dark: '{gray.350}',
      _light: '{gray.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.gray.700} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{gray.300}',
        _light: '{gray.700}'
      }
    }
  }
};

export const severity = {
  critical: {
    text: {
      _dark: '{magenta.400}',
      _light: '{magenta.650}'
    },
    chart: {
      _dark: '{magenta.400}',
      _light: '{magenta.650}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.magenta.600} 32%, transparent)',
      _light: 'color-mix(in srgb, {colors.magenta.400} 28%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{magenta.200}',
        _light: '{magenta.700}'
      }
    }
  },
  high: {
    text: {
      _dark: '{red.500}',
      _light: '{red.700}'
    },
    chart: {
      _dark: '{red.550}',
      _light: '{red.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.red.600} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.red.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{red.200}',
        _light: '{red.700}'
      }
    }
  },
  medium: {
    text: {
      _dark: '{orange.400}',
      _light: '{orange.600}'
    },
    chart: {
      _dark: '{orange.400}',
      _light: '{orange.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.orange.500} 40%, transparent)',
      _light: 'color-mix(in srgb, {colors.orange.300} 20%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{orange.100}',
        _light: '{orange.600}'
      }
    }
  },
  low: {
    text: {
      _dark: '{yellow.200}',
      _light: '{yellow.600}'
    },
    chart: {
      _dark: '{yellow.200}',
      _light: '{yellow.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.yellow.300} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.yellow.100} 72%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{yellow.100}',
        _light: '{yellow.600}'
      }
    }
  },
  informational: {
    text: {
      _dark: '{gray.350}',
      _light: '{gray.650}'
    },
    chart: {
      _dark: '{gray.350}',
      _light: '{gray.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.gray.700} 40%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{gray.300}',
        _light: '{gray.700}'
      }
    }
  }
};

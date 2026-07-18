import createTheme from '../createTheme';

describe('v4 theme (default)', () => {
  describe('unit conversion', () => {
    test('absolute length units: px', () => {
      const theme = createTheme('px');

      // Verify px units are used
      expect(theme.space['1x']).toBe('4px');
      expect(theme.fontSizes.md).toBe('16px');
      expect(theme.radii.sm).toBe('4px');
    });

    test('relative length units: rem', () => {
      const theme = createTheme('rem');

      // Verify rem units are used
      expect(theme.space['1x']).toBe('.25rem');
      expect(theme.fontSizes.md).toBe('1rem');
      expect(theme.radii.sm).toBe('0.25rem');
    });

    test('should default to rem units when no unit specified', () => {
      const theme = createTheme();

      // Verify rem units are used as default
      expect(theme.space['1x']).toBe('.25rem');
      expect(theme.fontSizes.md).toBe('1rem');
      expect(theme.radii.sm).toBe('0.25rem');
    });
  });

  describe('v2 deprecated tokens (backward compatibility)', () => {
    test('should include v2 color tokens - all color families', () => {
      const { colors } = createTheme('px');

      // V3 color format (color:shade) - special values
      expect(colors.transparent).toBe('transparent');
      expect(colors.current).toBe('currentColor');

      // Red family (100-10)
      expect(colors['red:100']).toBe('#6e0002');
      expect(colors['red:90']).toBe('#9d0003');
      expect(colors['red:80']).toBe('#b80003');
      expect(colors['red:70']).toBe('#d71920');
      expect(colors['red:60']).toBe('#e52630');
      expect(colors['red:50']).toBe('#f24c4f');
      expect(colors['red:40']).toBe('#f46f71');
      expect(colors['red:30']).toBe('#fd999a');
      expect(colors['red:20']).toBe('#fcc3c4');
      expect(colors['red:10']).toBe('#fee1e2');

      // Magenta family
      expect(colors['magenta:100']).toBe('#750037');
      expect(colors['magenta:50']).toBe('#e94181');
      expect(colors['magenta:10']).toBe('#fee1ec');

      // Purple family
      expect(colors['purple:100']).toBe('#460086');
      expect(colors['purple:50']).toBe('#ab6ff3');
      expect(colors['purple:10']).toBe('#eee1fe');

      // Blue family
      expect(colors['blue:100']).toBe('#002a7e');
      expect(colors['blue:50']).toBe('#578aef');
      expect(colors['blue:10']).toBe('#e1ebfe');

      // Green family
      expect(colors['green:100']).toBe('#003011');
      expect(colors['green:50']).toBe('#00a94f');
      expect(colors['green:10']).toBe('#c3fcd8');

      // Teal family
      expect(colors['teal:100']).toBe('#004034');
      expect(colors['teal:50']).toBe('#00a584');
      expect(colors['teal:10']).toBe('#c3fcf0');

      // Cyan family
      expect(colors['cyan:100']).toBe('#003664');
      expect(colors['cyan:50']).toBe('#0095bf');
      expect(colors['cyan:10']).toBe('#c3f9fc');

      // Gray family
      expect(colors['gray:100']).toBe('#151515');
      expect(colors['gray:50']).toBe('#8a8a8a');
      expect(colors['gray:10']).toBe('#f2f2f2');

      // Single shade colors
      expect(colors['orange:50']).toBe('#ff7633');
      expect(colors['yellow:50']).toBe('#faba2a');

      // White variations
      expect(colors['white:emphasis']).toBe('rgba(255, 255, 255, 1.0)');
      expect(colors['white:primary']).toBe('rgba(255, 255, 255, .92)');
      expect(colors['white:secondary']).toBe('rgba(255, 255, 255, .60)');
      expect(colors['white:tertiary']).toBe('rgba(255, 255, 255, .47)');
      expect(colors['white:disabled']).toBe('rgba(255, 255, 255, .28)');

      // Black variations
      expect(colors['black:emphasis']).toBe('rgba(0, 0, 0, 1.0)');
      expect(colors['black:primary']).toBe('rgba(0, 0, 0, .92)');
      expect(colors['black:secondary']).toBe('rgba(0, 0, 0, .65)');
      expect(colors['black:tertiary']).toBe('rgba(0, 0, 0, .54)');
      expect(colors['black:disabled']).toBe('rgba(0, 0, 0, .30)');
    });

    test('should include v2 space tokens', () => {
      const { space } = createTheme('px');

      // V3 space format (multiplier-based)
      expect(space).toMatchObject({
        '1q': '1px',
        '2q': '2px',
        '4q': '4px',
        '1h': '2px',
        '2h': '4px',
        '4h': '8px',
        '1x': '4px',
        '2x': '8px',
        '4x': '16px',
        '8x': '32px',
        '16x': '64px',
      });
    });

    test('should include v2 borders', () => {
      const { borders } = createTheme('rem');

      expect(borders).toEqual({
        '0.5': '0.0313rem solid',
        1: '0.0625rem solid',
        '1.5': '0.0938rem solid',
        2: '0.125rem solid',
        3: '0.1875rem solid',
        4: '0.25rem solid',
        5: '0.3125rem solid',
        6: '0.375rem solid',
        7: '0.4375rem solid',
        8: '0.5rem solid',
        9: '0.5625rem solid',
        10: '0.625rem solid',
      });
    });

    test('should include v2 typography tokens', () => {
      const { fonts, fontSizes, fontWeights, lineHeights } = createTheme('px');

      expect(fonts).toEqual({
        base: 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
        mono: '"DM Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
      });

      expect(fontSizes).toEqual({
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
      });

      expect(fontWeights).toEqual({
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      });

      expect(lineHeights).toEqual({
        normal: 'normal',
        base: '1.5',
        xs: '18px',
        sm: '20px',
        md: '22px',
        lg: '24px',
        xl: '28px',
        '2xl': '32px',
        '3xl': '36px',
        '4xl': '40px',
      });
    });

    test('should include v2 other tokens', () => {
      const { outlines, zIndices, breakpoints } = createTheme('px');

      expect(outlines).toEqual({
        1: '1px solid',
        2: '2px solid',
        3: '3px solid',
        4: '4px solid',
        5: '5px solid',
      });

      expect(zIndices).toEqual({
        hide: -1,
        auto: 'auto',
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        fixed: 1200,
        overlay: 1300,
        drawer: 1400,
        modal: 1500,
        popover: 1600,
        toast: 1700,
        tooltip: 1800,
      });

      // breakpoints should be an array with named properties
      expect(Array.isArray(breakpoints)).toBe(true);
      expect(breakpoints.length).toBe(5);
      expect(breakpoints[0]).toBe('320px');
      expect(breakpoints[1]).toBe('744px');
      expect(breakpoints.sm).toBe('320px');
      expect(breakpoints.md).toBe('744px');
    });
  });

  describe('v4 primitive tokens', () => {
    test('should include primitive colors - all color families with numeric shades', () => {
      const { colors } = createTheme('rem');

      // Special values
      expect(colors.transparent).toBe('transparent');
      expect(colors.current).toBe('currentColor');

      // Red family (100-1000 + lighten/darken variants)
      expect(colors.red).toMatchObject({
        100: '#ffe4e1',
        200: '#fed2cd',
        300: '#feaea7',
        400: '#ff847d',
        500: '#fe4648',
        550: '#e32631',
        600: { main: '#dd1128', lighten: { 80: '#e02439' }, darken: { 80: '#cf1025' } },
        650: { main: '#c70721' },
        700: { main: '#a9071b' },
        800: '#790410',
        900: '#530309',
        1000: '#340204'
      });

      // Magenta family
      expect(colors.magenta).toMatchObject({
        100: '#fde3eb',
        500: '#fe3b8f',
        1000: '#310417'
      });

      // Blue family
      expect(colors.blue).toMatchObject({
        100: '#e2ecfd',
        500: '#4c88fc',
        600: { main: '#1362fc', lighten: { 80: '#266ffc' } },
        650: { darken: { 80: '#014bd4' } },
        1000: '#001141'
      });

      // Green family
      expect(colors.green).toMatchObject({
        100: '#d4f8d8',
        500: '#1fa246',
        1000: '#051a09'
      });

      // Purple family
      expect(colors.purple).toMatchObject({
        100: '#ece8fe',
        600: { main: '#883ff9' },
        1000: '#200147'
      });

      // Gray family
      expect(colors.gray).toMatchObject({
        100: '#ffffff',
        500: '#8c8c8c',
        1000: '#000000'
      });
      expect(colors.gray[700]).toMatchObject({ main: '#525252', lighten: { 80: '#606060' } });
      expect(colors.gray[800]).toMatchObject({ main: '#393939', darken: { 80: '#343434' } });

      // White/Black families
      expect(colors.white).toMatchObject({
        100: '#ffffff',
        300: '#f2f2f2',
        600: '#dedede'
      });
      expect(colors.black).toMatchObject({
        100: '#2e2e2e',
        400: '#121212',
        600: '#000000'
      });

      // Orange, Yellow, Teal, Cyan families exist
      expect(colors.orange).toBeDefined();
      expect(colors.yellow).toBeDefined();
      expect(colors.teal).toBeDefined();
      expect(colors.cyan).toBeDefined();
    });

    test('should include primitive space tokens that override v2', () => {
      const { space } = createTheme('rem');

      // Primitive space tokens use q/h/x notation
      expect(space).toMatchObject({
        '1x': '.25rem', // primitive
        '2x': '.5rem', // primitive
        '4x': '1rem', // primitive
        '8x': '2rem', // primitive
      });
    });

    test('should include primitive radii tokens - all sizes', () => {
      const { radii } = createTheme('px');

      // v2 named tokens still present
      expect(radii).toMatchObject({
        circle: '50%',
        none: 0,
      });

      // v4 primitive radii (overrides v2 sm/md/lg)
      expect(radii).toMatchObject({
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
      });
    });

    test('should include primitive fonts - base, mono (merged with v2)', () => {
      const { fonts } = createTheme('rem');

      // V4 primitive fonts merged with v2 fonts
      expect(fonts).toEqual({
        base: 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
        mono: '"DM Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
      });
    });

    test('should include primitive fontSizes - named sizes', () => {
      const { fontSizes } = createTheme('px');

      expect(fontSizes).toEqual({
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
      });
    });

    test('should include primitive fontWeights - flat structure (merged with v2)', () => {
      const { fontWeights } = createTheme('rem');

      expect(fontWeights).toEqual({
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      });
    });

    test('should include primitive lineHeights - named sizes', () => {
      const { lineHeights } = createTheme('rem');

      expect(lineHeights).toEqual({
        normal: 'normal',
        base: '1.5',
        xs: '1.125rem',
        sm: '1.25rem',
        md: '1.375rem',
        lg: '1.5rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.25rem',
        '4xl': '2.5rem',
      });
    });

    test('should include primitive borders - all widths', () => {
      const { borders } = createTheme('px');

      expect(borders).toEqual({
        '0.5': '0.5px solid',
        1: '1px solid',
        '1.5': '1.5px solid',
        2: '2px solid',
        3: '3px solid',
        4: '4px solid',
        5: '5px solid',
        6: '6px solid',
        7: '7px solid',
        8: '8px solid',
        9: '9px solid',
        10: '10px solid'
      });
    });

    test('should include primitive outlines - all widths', () => {
      const { outlines } = createTheme('rem');

      expect(outlines).toEqual({
        1: '0.0625rem solid',
        2: '0.125rem solid',
        3: '0.1875rem solid',
        4: '0.25rem solid',
        5: '0.3125rem solid'
      });
    });

    test('should include primitive breakpoints - array with named properties', () => {
      const { breakpoints } = createTheme('rem');

      expect(Array.isArray(breakpoints)).toBe(true);
      expect(breakpoints.length).toBe(5);
      expect(breakpoints[0]).toBe('320px');
      expect(breakpoints[1]).toBe('744px');
      expect(breakpoints[2]).toBe('1440px');
      expect(breakpoints[3]).toBe('1680px');
      expect(breakpoints[4]).toBe('1920px');
      expect(breakpoints.sm).toBe('320px');
      expect(breakpoints.md).toBe('744px');
      expect(breakpoints.lg).toBe('1440px');
      expect(breakpoints.xl).toBe('1680px');
      expect(breakpoints['2xl']).toBe('1920px');
    });

    test('should include primitive zIndices - all layers', () => {
      const { zIndices } = createTheme('rem');

      expect(zIndices).toEqual({
        hide: -1,
        auto: 'auto',
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        fixed: 1200,
        overlay: 1300,
        drawer: 1400,
        modal: 1500,
        popover: 1600,
        toast: 1700,
        tooltip: 1800
      });
    });

    test('sizes should equal space', () => {
      const { sizes, space } = createTheme('rem');
      expect(sizes).toEqual(space);
    });
  });

  describe('v4 semantic tokens', () => {
    test('should include semantic color categories - all categories without _ prefix', () => {
      const { colors } = createTheme('rem');

      // Semantic color categories (without _ prefix, except _dark/_light)
      expect(colors).toHaveProperty('actions');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('border');
      expect(colors).toHaveProperty('error');
      expect(colors).toHaveProperty('info');
      expect(colors).toHaveProperty('minorWarning');
      expect(colors).toHaveProperty('neutral');
      expect(colors).toHaveProperty('promotion');
      expect(colors).toHaveProperty('riskLevel');
      expect(colors).toHaveProperty('severity');
      expect(colors).toHaveProperty('success');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('warning');

      // Verify they are objects
      expect(typeof colors.actions).toBe('object');
      expect(typeof colors.background).toBe('object');
      expect(typeof colors.border).toBe('object');
      expect(typeof colors.error).toBe('object');
      expect(typeof colors.info).toBe('object');
      expect(typeof colors.minorWarning).toBe('object');
      expect(typeof colors.neutral).toBe('object');
      expect(typeof colors.promotion).toBe('object');
      expect(typeof colors.riskLevel).toBe('object');
      expect(typeof colors.severity).toBe('object');
      expect(typeof colors.success).toBe('object');
      expect(typeof colors.text).toBe('object');
      expect(typeof colors.warning).toBe('object');

      // Should have _ prefixed tokens (internal use)
      expect(colors).toHaveProperty('_chart');
      expect(colors).toHaveProperty('_component');
      expect(colors).toHaveProperty('_foreground');
      expect(colors).toHaveProperty('_highlight');
      expect(colors).toHaveProperty('_link');
      expect(colors).toHaveProperty('_overlay');
      expect(colors).toHaveProperty('_shadow');
    });

    test('should include semantic shadows - elevation-first with directions and main alias', () => {
      const { shadows } = createTheme('rem');

      // All shadow elevations
      expect(shadows).toHaveProperty('low');
      expect(shadows).toHaveProperty('medium');
      expect(shadows).toHaveProperty('high');

      // Low shadows - all directions
      expect(shadows.low.down).toHaveProperty('_dark');
      expect(shadows.low.down).toHaveProperty('_light');
      expect(shadows.low.down._dark).toContain('0px 4px 8px');
      expect(shadows.low.down._light).toContain('0px 4px 8px');

      expect(shadows.low.up._dark).toContain('0px -4px 8px');
      expect(shadows.low.left._dark).toContain('-4px 0px 8px');
      expect(shadows.low.right._dark).toContain('4px 0px 8px');

      // main is a reference alias for down (resolved by resolveReferenceTokens)
      expect(shadows.low.main).toBe('{low.down}');

      // Medium shadows - all directions
      expect(shadows.medium.down._dark).toContain('0px 8px 16px');
      expect(shadows.medium.down._light).toContain('0px 8px 16px');
      expect(shadows.medium.up._dark).toContain('0px -8px 16px');
      expect(shadows.medium.left._dark).toContain('-8px 0px 16px');
      expect(shadows.medium.right._dark).toContain('8px 0px 16px');

      expect(shadows.medium.main).toBe('{medium.down}');

      // High shadows - all directions
      expect(shadows.high.down._dark).toContain('0px 10px 24px');
      expect(shadows.high.down._light).toContain('0px 10px 24px');
      expect(shadows.high.up._dark).toContain('0px -10px 24px');
      expect(shadows.high.left._dark).toContain('-10px 0px 24px');
      expect(shadows.high.right._dark).toContain('10px 0px 24px');

      expect(shadows.high.main).toBe('{high.down}');
    });
  });

  describe('token merging and priority', () => {
    test('should merge v2 (deprecated), primitives, and semantic tokens correctly', () => {
      const theme = createTheme('px');

      // Should have all three layers
      // 1. V3 deprecated tokens
      expect(theme.colors).toHaveProperty('red:100'); // v2
      expect(theme.space).toHaveProperty('1q'); // v2

      // 2. Primitive tokens (overrides v2 where conflicts)
      expect(theme.space).toHaveProperty('1x'); // primitive

      // 3. Semantic tokens (on top)
      expect(theme.colors).toHaveProperty('text'); // semantic
      expect(theme.shadows).toHaveProperty('low'); // semantic
      expect(theme.radii).toHaveProperty('sm'); // primitive
    });

    test('should not include semantic borders (not merged in current implementation)', () => {
      const { borders } = createTheme('px');

      // Only v2 borders (semantic borders not merged)
      expect(borders).toHaveProperty('1');

      // Should NOT have semantic border names
      expect(borders).not.toHaveProperty('thin');
      expect(borders).not.toHaveProperty('thick');
      expect(borders).not.toHaveProperty('thickest');
    });
  });

  describe('version parameter', () => {
    test('should create v4 theme by default with semantic tokens', () => {
      const themeDefault = createTheme('rem');

      // Should have semantic tokens
      expect(themeDefault.colors).toHaveProperty('text');
      expect(themeDefault.colors.text).toBeDefined();

      // Should also have v2 backward-compatible tokens
      expect(themeDefault.colors).toHaveProperty('red:100');
      expect(themeDefault.space).toHaveProperty('1x');
    });

    test('should create v4 theme with all token types', () => {
      const theme = createTheme('rem');

      // Has v2 deprecated tokens (backward compatibility)
      expect(theme.colors).toHaveProperty('red:100');
      expect(theme.space).toHaveProperty('1x');

      // Has semantic tokens
      expect(theme.colors.text).toBeDefined();
      expect(theme.colors.background).toBeDefined();
      expect(theme.colors.border).toBeDefined();

      // Has semantic shadows structure
      expect(theme.shadows.low).toBeDefined();
    });
  });
});

describe('v4 theme includes v2 backward compatibility', () => {
  test('should include v2 deprecated tokens for backward compatibility', () => {
    const { colors, shadows, radii } = createTheme('rem');

    // Has v2 colors (backward compatibility)
    expect(colors['red:100']).toBe('#6e0002');

    // Also has semantic colors (v4 feature)
    expect(colors.text).toBeDefined();
    expect(colors.background).toBeDefined();

    // Has both v2 and semantic shadows
    expect(shadows).toBeDefined();
    expect(shadows.low).toBeDefined(); // Semantic structure

    // V3 radii (sm/md/lg overridden by v4 primitives)
    expect(radii.sm).toBe('0.25rem');
    expect(radii.md).toBe('0.375rem');
    expect(radii.lg).toBe('0.5rem');
  });
});

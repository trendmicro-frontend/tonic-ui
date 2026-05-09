import { css } from '@emotion/react';

const baseCSS = theme => {
  const baseFonts = theme?.fonts?.base ?? 'inherit';
  const monoFonts = theme?.fonts?.mono ?? 'inherit';

  return css`
    /**
     * Apply a natural box layout model to all elements, but allowing components to change.
     */
    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

    html {
      font-family: ${baseFonts};
    }

    pre,
    code,
    kbd,
    samp {
      font-family: ${monoFonts};
    }
  `;
};

export default baseCSS;

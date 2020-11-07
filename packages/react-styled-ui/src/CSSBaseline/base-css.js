import { css } from '@emotion/core';
import _get from 'lodash.get';

const baseCSS = theme => {
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
      font-family: ${_get(theme, 'fonts.base')};
    }

    pre,
    code,
    kbd,
    samp {
      font-family: ${_get(theme, 'fonts.mono')};
    }
  `;
};

export default baseCSS;

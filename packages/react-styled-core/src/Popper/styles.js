import { css } from '@emotion/core';
import theme from '../theme';

const getPopperArrowStyle = ({
  arrowSize,
  arrowColor
}) => {
  const arrowPos = `calc(${arrowSize} * -1)`;

  return css`
    [data-popper-arrow] {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent;
    }

    &[data-popper-placement^="top"] [data-popper-arrow] {
      bottom: ${arrowPos};
      border-width: ${arrowSize} ${arrowSize} 0;
      border-top-color: ${theme.colors[arrowColor]};
    }

    &[data-popper-placement^="bottom"] [data-popper-arrow] {
      top: ${arrowPos};
      border-width: 0 ${arrowSize} ${arrowSize};
      border-bottom-color: ${theme.colors[arrowColor]};
    }

    &[data-popper-placement^="right"] [data-popper-arrow] {
      left: ${arrowPos};
      border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
      border-right-color: ${theme.colors[arrowColor]};
    }

    &[data-popper-placement^="left"] [data-popper-arrow] {
      right: ${arrowPos};
      border-width: ${arrowSize} 0 ${arrowSize} ${arrowSize};
      border-left-color: ${theme.colors[arrowColor]};
    }
  `;
};

export default getPopperArrowStyle;

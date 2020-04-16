import { css } from '@emotion/core';

const getPopperArrowStyle = ({
  arrowSize,
}) => {
  const arrowPos = `calc(${arrowSize} / 2 * -1)`;

  return css`
    [data-popper-arrow] {
      &,
      &::before {
        position: absolute;
        width: ${arrowSize};
        height: ${arrowSize};
        background: inherit;
      }
    }

    [data-popper-arrow]::before {
      content: '';
      transform: rotate(45deg);
      background: inherit;
    }

    &[data-popper-placement^="top"] [data-popper-arrow] {
      bottom: 0;
      &::before {
        bottom: ${arrowPos};
      }
    }

    &[data-popper-placement^="bottom"] [data-popper-arrow] {
      top: 0;
      &::before {
        top: ${arrowPos};
      }
    }

    &[data-popper-placement^="right"] [data-popper-arrow] {
      left: 0;
      &::before {
        left: ${arrowPos};
      }
    }

    &[data-popper-placement^="left"] [data-popper-arrow] {
      right: 0;
      &::before {
        right: ${arrowPos};
      }
    }
  `;
};

export default getPopperArrowStyle;

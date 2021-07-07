import { css } from '@emotion/react';

const getPopperArrowStyle = ({
  arrowSize,
}) => {
  const arrowPos = `calc(${arrowSize} / 2 * -1)`;

  return css`
    [data-arrow-style] {
      &,
      &::before {
        position: absolute;
        width: ${arrowSize};
        height: ${arrowSize};
        background: inherit;
      }
    }

    [data-arrow-style]::before {
      content: '';
      transform: rotate(45deg);
      background: inherit;
    }

    &[data-popper-placement^="top"] [data-arrow-style] {
      bottom: 0;
      &::before {
        bottom: ${arrowPos};
      }
    }

    &[data-popper-placement^="bottom"] [data-arrow-style] {
      top: 0;
      &::before {
        top: ${arrowPos};
      }
    }

    &[data-popper-placement^="right"] [data-arrow-style] {
      left: 0;
      &::before {
        left: ${arrowPos};
      }
    }

    &[data-popper-placement^="left"] [data-arrow-style] {
      right: 0;
      &::before {
        right: ${arrowPos};
      }
    }
  `;
};

export default getPopperArrowStyle;

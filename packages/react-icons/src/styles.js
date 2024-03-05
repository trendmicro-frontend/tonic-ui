import { keyframes } from '@emotion/react';

const cwSpin = keyframes`
0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(1turn)
  }
`;

const ccwSpin = keyframes`
  0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(-1turn)
  }
`;

const useIconStyle = ({ spin }) => {
  return {
    animation: (() => {
      if (spin === 'ccw') {
        return `${ccwSpin} 2s linear infinite`;
      }
      if (spin === 'cw' || spin === true) {
        return `${cwSpin} 2s linear infinite`;
      }
      return undefined;
    })()
  };
};

export {
  useIconStyle,
};

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
  let animation;
  if (spin === 'ccw') {
    animation = `${ccwSpin} 2s linear infinite`;
  } else if (spin === 'cw' || spin === true) {
    animation = `${cwSpin} 2s linear infinite`;
  }

  return {
    animation,
  };
};

export {
  useIconStyle,
};

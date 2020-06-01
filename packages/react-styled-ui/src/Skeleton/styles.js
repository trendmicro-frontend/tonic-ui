import { css, keyframes } from '@emotion/core';
import _includes from 'lodash/includes';
import useColorMode from '../useColorMode';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// eslint-disable-next-line consistent-return
const getAnimationCSS = (animation) => {
  if (animation === 'pulse') {
    return css`
      animation: ${pulse} 1.5s ease-in-out .5s infinite;
    `;
  }

  if (animation === 'wave') {
    return css`
      overflow: hidden;
      position: relative;
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        animation: ${wave} 1.6s linear .5s infinite;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .08), transparent);
      }
    `;
  }
};

// eslint-disable-next-line consistent-return
const getVariantCSS = (variant) => {
  if (variant === 'text') {
    return css`
      :empty::before {
        content: "\\00a0";
      }
    `;
  }
};

const baseProps = {
  display: 'block',
  height: '5x',
};

const getTextStyle = () => {
  return {
    height: 'auto',
    transform: 'scale(1, .6)',
    borderRadius: 'sm',
    transformOrigin: '0 60%',
  };
};

const getRectStyle = () => {
  return { /* empty */ };
};

const getCircleStyle = () => {
  return {
    borderRadius: '50%',
  };
};

const getVariantProps = (props) => {
  const { variant } = props;

  if (variant === 'text') {
    return getTextStyle();
  }

  if (variant === 'rect') {
    return getRectStyle();
  }

  if (variant === 'circle') {
    return getCircleStyle();
  }

  return {};
};

const useSkeletonStyle = ({
  animation,
  variant,
}) => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    dark: 'gray:90',
    light: 'gray:10',
  }[colorMode];
  const _props = {
    variant,
  };
  const variantProps = getVariantProps(_props);

  const builtinAnimationTypes = ['pulse', 'wave'];
  if (_includes(builtinAnimationTypes, animation)) {
    animation = undefined;
  }

  return {
    ...baseProps,
    animation,
    backgroundColor,
    ...variantProps,
  };
};

export {
  getAnimationCSS,
  getVariantCSS,
  useSkeletonStyle,
};

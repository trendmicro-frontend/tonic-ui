import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PseudoBox from '../PseudoBox';
import useColorMode from '../useColorMode';

const baseStyleProps = (colorMode, hideUnderline) => {
  const color = { light: 'blue:60', dark: 'blue:40' }[colorMode];
  const hoverColor = { light: 'blue:50', dark: 'blue:40' }[colorMode];
  const visitedColor = { light: 'purple:60', dark: 'purple:50' }[colorMode];
  const disabledColor = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];

  return {
    color,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none',
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
    },
    _visited: {
      color: visitedColor,
    },
    _hover: {
      color: hoverColor,
      textDecoration: hideUnderline ? 'none' : 'underline',
    },
    _active: {
      color: 'blue:60',
      textDecoration: hideUnderline ? 'none' : 'underline',
    },
  };
};

const Link = forwardRef(({ disabled, onClick, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const hideUnderline = props.textDecoration !== 'underline' && disabled;
  return (
    <PseudoBox
      as="a"
      ref={ref}
      aria-disabled={disabled}
      onClick={disabled ? event => event.preventDefault() : onClick}
      {...baseStyleProps(colorMode, hideUnderline)}
      {...props}
    />
  );
});

Link.propTypes = {
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  textDecoration: PropTypes.string
};

Link.displayName = 'Link';

export default Link;

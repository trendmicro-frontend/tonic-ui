import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PseudoBox from '../PseudoBox';
import useColorMode from '../useColorMode';

const baseStyleProps = (colorMode, disabled, textDecoration) => {
  const color = { light: 'blue:60', dark: 'blue:40' }[colorMode];
  const hoverColor = { light: 'blue:50', dark: 'blue:40' }[colorMode];
  const visitedColor = { light: 'purple:60', dark: 'purple:50' }[colorMode];
  const disabledColor = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];
  const hoverTextDecoration = !!disabled ? 'none' : 'underline';
  const activeTextDecoration = !!disabled ? 'none' : 'underline';
  return {
    color,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: textDecoration ?? 'none',
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
    },
    _visited: {
      color: visitedColor,
    },
    _hover: {
      color: hoverColor,
      textDecoration: textDecoration ?? hoverTextDecoration,
    },
    _active: {
      color: 'blue:60',
      textDecoration: textDecoration ?? activeTextDecoration,
    },
  };
};

const Link = forwardRef(({ disabled, onClick, textDecoration, ...props }, ref) => {
  const { colorMode } = useColorMode();
  //const hideUnderline = props.textDecoration !== 'underline' && disabled;
  return (
    <PseudoBox
      as="a"
      ref={ref}
      aria-disabled={disabled}
      onClick={disabled ? event => event.preventDefault() : onClick}
      {...baseStyleProps(colorMode, disabled, textDecoration)}
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

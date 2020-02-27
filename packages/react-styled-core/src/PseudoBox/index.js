import styled from '@emotion/styled';
import css from '@styled-system/css';
import Box from '../Box';

const createPseudoClassTransformFunction = name => prop => {
  const result = {};
  if (Array.isArray(prop)) {
    result[`${name}(${prop[0]})`] = prop[1];
  } else if (typeof prop === 'object') {
    for (const key in prop) {
      if (Object.prototype.hasOwnProperty.call(prop, key)) {
        result[`${name}(${key})`] = prop[key];
      }
    }
  }
  return result;
};

/**
 * Pseudo-classes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */

const active = '&:active';
const checked = '&:checked';
const selected = '&[data-active=true], &:active[data-active=true], &:hover[data-active=true]';
const disabled = '&[aria-disabled=true], &:disabled, &:disabled:focus, &:disabled:hover, &:focus[aria-disabled=true], &:hover[aria-disabled=true]';
const empty = '&:empty';
const enabled = '&:enabled, &:enabled:focus, &:enabled:hover';
const firstChild = '&:first-child';
const firstOfType = '&:first-of-type';
const fullscreen = '&:fullscreen';
const focus = '&:focus';
const focusWithin = '&:focus-within';
const hover = '&:hover';
const indeterminate = '&:indeterminate';
const invalid = '&:invalid';
const lastChild = '&:last-child';
const lastOfType = '&:last-of-type';
const nthOfTypeFn = createPseudoClassTransformFunction('&:nth-of-type');
const readOnly = '&:read-only';
const visited = '&:visited';

/**
 * Pseudo-elements
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */

const after = '&::after';
const backdrop = '&::backdrop';
const before = '&::before';
const cue = '&::cue';
const firstLetter = '&::first-letter';
const firstLine = '&::first-line';
const placeholder = '&::placeholder';
const selection = '&::selection';

const PseudoBox = styled(Box)(
  ({
    // pseudo-classes
    _active,
    _checked,
    _selected,
    _disabled,
    _empty,
    _enabled,
    _firstChild,
    _firstOfType,
    _fullscreen,
    _focus,
    _focusWithin,
    _hover,
    _indeterminate,
    _invalid,
    _lastChild,
    _lastOfType,
    _nthOfType,
    _readOnly,
    _visited,

    // pseudo-elements
    __after,
    __backdrop,
    __before,
    __cue,
    __firstLetter,
    __firstLine,
    __placeholder,
    __selection,
  }) => {
    let rest = null;

    if (_nthOfType) {
      rest = { ...rest, ...nthOfTypeFn(_nthOfType) };
    }

    return css({
      // pseudo-classes
      // XXX:
      //    a:hover MUST come after a:link and a:visited in the CSS definition in order to be effective.
      //    a:active MUST come after a:hover in the CSS definition in order to be effective.
      [focus]: _focus,
      [visited]: _visited,
      [hover]: _hover,
      [active]: _active,
      [checked]: _checked,
      [selected]: _selected,
      [disabled]: _disabled,
      [empty]: _empty,
      [enabled]: _enabled,
      [firstChild]: _firstChild,
      [firstOfType]: _firstOfType,
      [fullscreen]: _fullscreen,
      [focusWithin]: _focusWithin,
      [indeterminate]: _indeterminate,
      [invalid]: _invalid,
      [lastChild]: _lastChild,
      [lastOfType]: _lastOfType,
      [readOnly]: _readOnly,

      // pseudo-elements
      [after]: __after,
      [backdrop]: __backdrop,
      [before]: __before,
      [cue]: __cue,
      [firstLetter]: __firstLetter,
      [firstLine]: __firstLine,
      [placeholder]: __placeholder,
      [selection]: __selection,

      ...rest
    });
  },
);

PseudoBox.displayName = 'PseudoBox';

export default PseudoBox;

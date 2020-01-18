import styled from '@emotion/styled';
import css from '@styled-system/css';
import Box from '../Box';

/**
 * Pseudo-classes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */

const active = '&:active';
const checked = '&:checked';
const disabled = '&[aria-disabled=true], &:disabled, &:disabled:focus, &:disabled:hover, &:focus[aria-disabled=true], &:hover[aria-disabled=true]';
const empty = '&:empty';
const enabled = '&:enabled, &:enabled:focus, &:enabled:hover';
const first = '&:first';
const firstChild = '&:first-child';
const firstOfType = '&:first-of-type';
const fullscreen = '&:fullscreen';
const focus = '&:focus';
const focusWithin = '&:focus-within';
const hover = '&:hover';
const indeterminate = '&:indeterminate';
const invalid = ':invalid';
const lastChild = ':last-child';
const lastOfType = ':last-of-type';
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
    _active,
    _checked,
    _disabled,
    _empty,
    _enabled,
    _first,
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
    _readOnly,
    _visited,

    /**
     * Pseudo-elements
     */
    __after,
    __backdrop,
    __before,
    __cue,
    __firstLetter,
    __firstLine,
    __placeholder,
    __selection,
  }) => {
    return css({
      /**
       * Pseudo-classes
       */
      [hover]: _hover,
      [focus]: _focus,
      [active]: _active,
      [checked]: _checked,
      [visited]: _visited,
      [disabled]: _disabled,
      [empty]: _empty,
      [enabled]: _enabled,
      [first]: _first,
      [firstChild]: _firstChild,
      [firstOfType]: _firstOfType,
      [fullscreen]: _fullscreen,
      [focusWithin]: _focusWithin,
      [indeterminate]: _indeterminate,
      [invalid]: _invalid,
      [lastChild]: _lastChild,
      [lastOfType]: _lastOfType,
      [readOnly]: _readOnly,

      /**
       * Pseudo-elements
       */
      [after]: __after,
      [backdrop]: __backdrop,
      [before]: __before,
      [cue]: __cue,
      [firstLetter]: __firstLetter,
      [firstLine]: __firstLine,
      [placeholder]: __placeholder,
      [selection]: __selection,
    });
  },
);

PseudoBox.displayName = 'PseudoBox';

export default PseudoBox;

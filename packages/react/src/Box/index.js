import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { ensureArray } from 'ensure-type';
import { cx, system } from '../shared/styled-system';

const shouldForwardProp = (() => {
  const stylePropMap = ensureArray(system.propNames)
    .reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {});
  const omittedStylePropMap = {
    ...stylePropMap,

    // The `as` prop is supported by Emotion
    'as': true,
  };

  return prop => isPropValid(prop) && !omittedStylePropMap[prop];
})();

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

const active = [
  '&:active',
  '&[data-active=true]'
].join(',');
const checked = [
  '&[aria-checked=true]',
  '&:checked',
].join(',');
const selected = [
  '&[aria-selected=true]',
  '&[data-selected=true]',
  '&:active[data-selected=true]',
  '&:hover[data-selected=true]',
].join(',');
const disabled = [
  '&[aria-disabled=true]',
  '&:disabled',
  '&:disabled:hover',
  '&:disabled:focus',
  '&:hover[aria-disabled=true]',
  '&:focus[aria-disabled=true]',
].join(',');
const empty = '&:empty';
const enabled = [
  '&:enabled',
  '&:enabled:focus',
  '&:enabled:hover',
].join(',');
const firstChild = '&:first-child';
const firstOfType = '&:first-of-type';
const fullscreen = '&:fullscreen';
const focus = '&:focus';
const focusActive = '&:focus:active';
const focusHover = '&:focus:hover';
const focusWithin = '&:focus-within';
const focusSelected = ['&[aria-selected=true]:focus', '&[data-selected=true]:focus'].join(',');
const hover = '&:hover';
const indeterminate = '&:indeterminate';
const valid = [
  '&[aria-invalid=false]',
  '&:valid',
].join(',');
const invalid = [
  '&[aria-invalid=true]',
  '&:invalid',
].join(',');
const lastChild = '&:last-child';
const lastOfType = '&:last-of-type';
const nthOfTypeFn = createPseudoClassTransformFunction('&:nth-of-type');
const readOnly = [
  '&[aria-readonly=true]',
  '&:read-only',
].join(',');
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

const _Box = styled('div', {
  shouldForwardProp,
})(system);

const Box = styled(_Box)(
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
    _focusActive,
    _focusHover,
    _focusWithin,
    _focusSelected,
    _hover,
    _indeterminate,
    _valid,
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

    return cx({
      /**
       * Pseudo-classes must be declared in a specific order, as shown below:
       *
       * ```
       * :link
       * :visited
       * :hover
       * :active
       * ```
       *
       * Each pseudo-class corresponds to an event which can only happen later in the timeline than the one before.
       *
       * That is to say:
       *
       * 1. A link is unvisited before it is visited.
       * 2. A link is visited before it is hovered over.
       * 3. A link is hovered over before it is in active use.
       */
      [focus]: _focus,
      [visited]: _visited,
      [hover]: _hover,
      [focusHover]: _focusHover,
      [active]: _active,
      [focusActive]: _focusActive,
      [focusSelected]: _focusSelected,
      [focusWithin]: _focusWithin,
      [checked]: _checked,
      [selected]: _selected,
      [disabled]: _disabled,
      [empty]: _empty,
      [enabled]: _enabled,
      [firstChild]: _firstChild,
      [firstOfType]: _firstOfType,
      [fullscreen]: _fullscreen,
      [indeterminate]: _indeterminate,
      [valid]: _valid,
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

Box.displayName = 'Box';

export default Box;

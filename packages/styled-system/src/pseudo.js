import cx from './cx';

const noop = () => {};

const createTransform = (name) => {
  if (Array.isArray(name)) {
    name = name.join(',');
  }
  if (!name || typeof name !== 'string') {
    return noop;
  }

  return (props) => {
    const result = {};
    if (props && typeof props === 'object') {
      result[name] = props;
    }
    return result;
  };
};

const createNthOfTypeTransform = (name) => {
  if (Array.isArray(name)) {
    name = name.join(',');
  }
  if (!name || typeof name !== 'string') {
    return noop;
  }

  return (props) => {
    const result = {};
    if (props && typeof props === 'object') {
      for (const [key, value] of Object.entries(props)) {
        result[`${name}(${key})`] = value;
      }
    }
    return result;
  };
};

/**
 * Pseudo-classes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */

const _activeTransform = createTransform('&:active');
const _checkedTransform = createTransform([
  '&[aria-checked=true]',
  '&:checked',
]);
const _disabledTransform = createTransform([
  '&[aria-disabled=true]',
  '&:disabled',
  '&:disabled:hover',
  '&:disabled:focus',
  '&:hover[aria-disabled=true]',
  '&:focus[aria-disabled=true]',
]);
const _emptyTransform = createTransform('&:empty');
const _enabledTransform = createTransform([
  '&:enabled',
  '&:enabled:focus',
  '&:enabled:hover',
]);
const _firstChildTransform = createTransform('&:first-child');
const _firstOfTypeTransform = createTransform('&:first-of-type');
const _fullscreenTransform = createTransform('&:fullscreen');
const _focusTransform = createTransform('&:focus');
const _focusActiveTransform = createTransform('&:focus:active');
const _focusHoverTransform = createTransform('&:focus:hover');
const _focusSelectedTransform = createTransform('&[aria-selected=true]:focus');
const _focusWithinTransform = createTransform('&:focus-within');
const _hoverTransform = createTransform('&:hover');
const _indeterminateTransform = createTransform('&:indeterminate');
const _invalidTransform = createTransform([
  '&[aria-invalid=true]',
  '&:invalid',
]);
const _lastChildTransform = createTransform('&:last-child');
const _lastOfTypeTransform = createTransform('&:last-of-type');
const _nthOfTypeTransform = createNthOfTypeTransform('&:nth-of-type');
const _readOnlyTransform = createTransform([
  '&[aria-readonly=true]',
  '&:read-only',
]);
const _selectedTransform = createTransform([
  '&[aria-selected=true]',
  '&:active[aria-selected=true]',
  '&:hover[aria-selected=true]',
]);
const _validTransform = createTransform([
  '&[aria-invalid=false]',
  '&:valid',
]);
const _visitedTransform = createTransform('&:visited');

/**
 * Pseudo-elements
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */

const __afterTransform = createTransform('&::after');
const __backdropTransform = createTransform('&::backdrop');
const __beforeTransform = createTransform('&::before');
const __cueTransform = createTransform('&::cue');
const __firstLetterTransform = createTransform('&::first-letter');
const __firstLineTransform = createTransform('&::first-line');
const __placeholderTransform = createTransform('&::placeholder');
const __selectionTransform = createTransform('&::selection');

const pseudo = ({
  // pseudo-classes
  _active,
  _checked,
  _disabled,
  _empty,
  _enabled,
  _firstChild,
  _firstOfType,
  _fullscreen,
  _focus,
  _focusActive,
  _focusHover,
  _focusSelected,
  _focusWithin,
  _hover,
  _indeterminate,
  _invalid,
  _lastChild,
  _lastOfType,
  _nthOfType,
  _readOnly,
  _selected,
  _valid,
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
    ..._focusTransform(_focus),
    ..._visitedTransform(_visited),
    ..._hoverTransform(_hover),
    ..._focusHoverTransform(_focusHover),
    ..._activeTransform(_active),
    ..._focusActiveTransform(_focusActive),
    ..._focusSelectedTransform(_focusSelected),
    ..._focusWithinTransform(_focusWithin),
    ..._checkedTransform(_checked),
    ..._selectedTransform(_selected),
    ..._disabledTransform(_disabled),
    ..._emptyTransform(_empty),
    ..._enabledTransform(_enabled),
    ..._firstChildTransform(_firstChild),
    ..._firstOfTypeTransform(_firstOfType),
    ..._fullscreenTransform(_fullscreen),
    ..._indeterminateTransform(_indeterminate),
    ..._validTransform(_valid),
    ..._invalidTransform(_invalid),
    ..._lastChildTransform(_lastChild),
    ..._lastOfTypeTransform(_lastOfType),
    ..._nthOfTypeTransform(_nthOfType),
    ..._readOnlyTransform(_readOnly),

    // pseudo-elements
    ...__afterTransform(__after),
    ...__backdropTransform(__backdrop),
    ...__beforeTransform(__before),
    ...__cueTransform(__cue),
    ...__firstLetterTransform(__firstLetter),
    ...__firstLineTransform(__firstLine),
    ...__placeholderTransform(__placeholder),
    ...__selectionTransform(__selection),
  });
};

export default pseudo;

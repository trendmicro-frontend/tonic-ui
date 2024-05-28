const noop = () => {};

const createSelectorFunction = (name) => {
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
    return Object.entries(result);
  };
};

const createNthOfTypeSelectorFunction = (name) => {
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
    return Object.entries(result);
  };
};

/**
 * Pseudo-classes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */
const pseudoClassSelector = {
  _active: createSelectorFunction([
    '&:active',
    '&[data-active]',
  ]),
  _checked: createSelectorFunction([
    '&:checked',
    '&[aria-checked=true]',
    '&[data-checked]',
  ]),
  _disabled: createSelectorFunction([
    '&:disabled',
    '&:disabled:focus',
    '&:disabled:hover',
    '&[aria-disabled=true]',
    '&[aria-disabled=true]:focus',
    '&[aria-disabled=true]:hover',
    '&[data-disabled]',
  ]),
  _empty: createSelectorFunction('&:empty'),
  _enabled: createSelectorFunction([
    '&:enabled',
    '&:enabled:focus',
    '&:enabled:hover',
  ]),
  _firstChild: createSelectorFunction('&:first-child'),
  _firstOfType: createSelectorFunction('&:first-of-type'),
  _fullscreen: createSelectorFunction('&:fullscreen'),
  _focus: createSelectorFunction([
    '&:focus',
    '&[data-focus]',
  ]),
  _focusActive: createSelectorFunction('&:focus:active'),
  _focusHover: createSelectorFunction('&:focus:hover'),
  _focusVisible: createSelectorFunction('&:focus-visible'),
  _focusWithin: createSelectorFunction('&:focus-within'),
  _hover: createSelectorFunction([
    '&:hover',
    '&[data-hover]',
  ]),
  _indeterminate: createSelectorFunction([
    '&:indeterminate',
  ]),
  _invalid: createSelectorFunction([
    '&:invalid',
    '&[aria-invalid=true]',
  ]),
  _lastChild: createSelectorFunction('&:last-child'),
  _lastOfType: createSelectorFunction('&:last-of-type'),
  _notFirstChild: createSelectorFunction('&:not(:first-child)'),
  _notFirstOfType: createSelectorFunction('&:not(:first-of-type)'),
  _notLastChild: createSelectorFunction('&:not(:last-child)'),
  _notLastOfType: createSelectorFunction('&:not(:last-of-type)'),
  _nthOfType: createNthOfTypeSelectorFunction('&:nth-of-type'),
  _placeholderShown: createSelectorFunction('&:placeholder-shown'),
  _optional: createSelectorFunction('&:optional'),
  _readOnly: createSelectorFunction([
    '&:read-only',
    '&[aria-readonly=true]',
    '&[data-readonly]',
  ]),
  _required: createSelectorFunction('&:required'),
  _selected: createSelectorFunction([
    '&[aria-selected=true]',
    '&[data-selected]',
  ]),
  _valid: createSelectorFunction([
    '&[aria-invalid=false]',
    '&:valid',
  ]),
  _visited: createSelectorFunction('&:visited'),
};

/**
 * Pseudo-elements
 * https://developer.mozilla.org/en-US/docs/Web/CSS/
 */
const pseudoElementSelector = {
  __after: createSelectorFunction('&::after'),
  __backdrop: createSelectorFunction('&::backdrop'),
  __before: createSelectorFunction('&::before'),
  __cue: createSelectorFunction('&::cue'),
  __firstLetter: createSelectorFunction('&::first-letter'),
  __firstLine: createSelectorFunction('&::first-line'),
  __marker: createSelectorFunction('&::marker'),
  __placeholder: createSelectorFunction('&::placeholder'),
  __selection: createSelectorFunction('&::selection'),
};

export {
  pseudoClassSelector,
  pseudoElementSelector,
};

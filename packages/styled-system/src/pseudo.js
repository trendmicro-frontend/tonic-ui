import {
  noop,
  warnDeprecatedProps,
} from '@tonic-ui/utils';

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

const createFunctionalSelectorFunction = (name) => {
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
  _focusActive: (() => { // deprecated
    const selectorFunction = createSelectorFunction('&:focus:active');
    let _warnedOnce = false;
    return (props) => {
      if (process.env.NODE_ENV !== 'production' && !_warnedOnce) {
        warnDeprecatedProps('_focusActive', {
          alternative: '_focus: { \'&:active\': { } }',
          willRemove: true,
        });
        _warnedOnce = true;
      }
      return selectorFunction(props);
    };
  })(),
  _focusHover: (() => { // deprecated
    const selectorFunction = createSelectorFunction('&:focus:hover');
    let _warnedOnce = false;
    return (props) => {
      if (process.env.NODE_ENV !== 'production' && !_warnedOnce) {
        warnDeprecatedProps('_focusHover', {
          alternative: '_focus: { \'&:hover\': { } }',
          willRemove: true,
        });
        _warnedOnce = true;
      }
      return selectorFunction(props);
    };
  })(),
  _focusVisible: createSelectorFunction('&:focus-visible'),
  _focusWithin: createSelectorFunction('&:focus-within'),
  _has: createFunctionalSelectorFunction('&:has'),
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
  _is: createFunctionalSelectorFunction('&:is'),
  _lastChild: createSelectorFunction('&:last-child'),
  _lastOfType: createSelectorFunction('&:last-of-type'),
  _not: createFunctionalSelectorFunction('&:not'),
  _nthOfType: createFunctionalSelectorFunction('&:nth-of-type'),
  _optional: createSelectorFunction('&:optional'),
  _placeholderShown: createSelectorFunction('&:placeholder-shown'),
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

import { ensureArray, ensureBoolean, ensureString } from 'ensure-type';
import { isPlainObject } from './assertion';

const _joinWords = (words) => {
  words = ensureArray(words);
  if (words.length === 0) {
    return '';
  }
  if (words.length === 1) {
    return `'${words[0]}'`;
  }
  if (words.length === 2) {
    return `'${words[0]}' and '${words[1]}'`;
  }
  return `'${words.slice(0, -1).join('\', \'')}', and '${words.slice(-1)}'`;
};

const _deepClone = (source, seen = new WeakMap()) => {
  // Use a `WeakMap` to track objects and detect circular references.
  // If the object has been cloned before, return the cached cloned version.
  if (seen.has(source)) {
    return seen.get(source);
  }

  if (Array.isArray(source)) {
    const clonedArray = [];
    seen.set(source, clonedArray);
    for (let i = 0; i < source.length; ++i) {
      clonedArray[i] = _deepClone(source[i], seen);
    }
    return clonedArray;
  }

  if (isPlainObject(source)) {
    const clonedObject = {};
    seen.set(source, clonedObject);
    for (const [key, value] of Object.entries(source)) {
      clonedObject[key] = _deepClone(value, seen);
    }
    return clonedObject;
  }

  // For primitive values and other types, return as is
  return source;
};

export const ariaAttr = (condition) => {
  return ensureBoolean(condition) ? true : undefined;
};

export const callAll = (...fns) => {
  return function mergedFn(...args) {
    fns.forEach((fn) => {
      fn?.(...args);
    });
  };
};

export const callEventHandlers = (...fns) => {
  return function mergedFn(event) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
};

export const dataAttr = (condition) => {
  return condition ? '' : undefined;
};

export const merge = (target, source, options = { clone: true }) => {
  // Merge arrays
  if (Array.isArray(target) && Array.isArray(source)) {
    const output = options.clone ? [...target] : target;
    source.forEach((item, index) => {
      if (isPlainObject(item) && isPlainObject(output[index])) {
        output[index] = merge(output[index], item, options);
      } else {
        output[index] = options.clone ? _deepClone(item) : item;
      }
    });
    return output;
  }

  // Merge plain objects
  if (isPlainObject(target) && isPlainObject(source)) {
    const output = options.clone ? { ...target } : target;
    for (const [key, value] of Object.entries(source)) {
      if (isPlainObject(value) && Object.prototype.hasOwnProperty.call(output, key) && isPlainObject(output[key])) {
        output[key] = merge(output[key], value, options);
      } else {
        output[key] = options.clone ? _deepClone(value) : value;
      }
    }
    return output;
  }

  return options.clone ? _deepClone(source) : source;
};

export const noop = () => {};

export const once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
};

export const runIfFn = (valueOrFn, ...args) => {
  return (typeof valueOrFn === 'function') ? valueOrFn(...args) : valueOrFn;
};

export const warnDeprecatedProps = (props, options) => {
  const prefix = options?.prefix ?? 'Warning:';
  const alternative = ensureArray(options?.alternative);
  const willRemove = ensureBoolean(options?.willRemove);
  const message = ensureString(options?.message);

  props = ensureArray(props);
  if (props.length === 0) {
    return;
  }

  const messages = [prefix];
  const verb = (props.length > 1) ? 'are' : 'is';

  if (willRemove) {
    messages.push(`${_joinWords(props)} ${verb} deprecated and will be removed in the next major release.`);
  } else {
    messages.push(`${_joinWords(props)} ${verb} deprecated.`);
  }

  if (alternative.length > 0) {
    messages.push(`Use ${_joinWords(alternative)} instead.`);
  }

  if (message) {
    messages.push(message);
  }

  console.error(messages.join(' '));
};

export const warnRemovedProps = (props, options) => {
  const prefix = options?.prefix ?? 'Warning:';
  const alternative = ensureArray(options?.alternative);
  const message = ensureString(options?.message);

  props = ensureArray(props);
  if (props.length === 0) {
    return;
  }

  const messages = [prefix];
  const verb = (props.length > 1) ? 'are' : 'is';

  messages.push(`${_joinWords(props)} ${verb} removed.`);

  if (alternative.length > 0) {
    messages.push(`Use ${_joinWords(alternative)} instead.`);
  }

  if (message) {
    messages.push(message);
  }

  console.error(messages.join(' '));
};

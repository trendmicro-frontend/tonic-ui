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

const _deepClone = (source) => {
  if (!isPlainObject(source)) {
    return source;
  }

  const output = {};

  Object.keys(source).forEach((key) => {
    output[key] = _deepClone(source[key]);
  });

  return output;
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

export const deepmerge = (target, source, options = { clone: true }) => {
  const output = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (
        isPlainObject(source[key]) &&
        Object.prototype.hasOwnProperty.call(target, key) &&
        isPlainObject(target[key])
      ) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? _deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
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

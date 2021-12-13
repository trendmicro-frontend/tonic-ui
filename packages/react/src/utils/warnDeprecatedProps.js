import { ensureArray, ensureBoolean, ensureString } from 'ensure-type';

const joinWords = (words) => {
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

const warnDeprecatedProps = (props, options) => {
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
    messages.push(`${joinWords(props)} ${verb} deprecated and will be removed in the next major release.`);
  } else {
    messages.push(`${joinWords(props)} ${verb} deprecated.`);
  }

  if (alternative.length > 0) {
    messages.push(`Use ${joinWords(alternative)} instead.`);
  }

  if (message) {
    messages.push(message);
  }

  console.error(messages.join(' '));
};

export default warnDeprecatedProps;

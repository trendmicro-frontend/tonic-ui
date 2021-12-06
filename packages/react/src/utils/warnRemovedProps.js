import { ensureArray, ensureString } from 'ensure-type';

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

const warnRemovedProps = (props, options) => {
  const alternative = ensureArray(options?.alternative);
  const message = ensureString(options?.message);

  props = ensureArray(props);
  if (props.length === 0) {
    return;
  }

  const messages = [];
  const verb = (props.length > 1) ? 'are' : 'is';

  messages.push(`Warning: ${joinWords(props)} ${verb} removed.`);

  if (alternative.length > 0) {
    messages.push(`Use ${joinWords(alternative)} instead.`);
  }

  if (message) {
    messages.push(message);
  }

  console.error(messages.join(' '));
};

export default warnRemovedProps;

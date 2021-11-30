import { ensureArray, ensureBoolean, ensureString } from 'ensure-type';

const warnDeprecatedProps = (deprecatedProps, options) => {
  const alternative = ensureArray(options?.alternative);
  const willRemove = ensureBoolean(options?.willRemove);
  const message = ensureString(options?.message);

  deprecatedProps = ensureArray(deprecatedProps);
  if (deprecatedProps.length === 0) {
    return;
  }

  const messages = [];
  const verb = (deprecatedProps.length > 1) ? 'are' : 'is';

  if (willRemove) {
    messages.push(`Warning: '${deprecatedProps.join(', ')}' ${verb} deprecated and will be removed in the next major release.`);
  } else {
    messages.push(`Warning: '${deprecatedProps.join(', ')}' ${verb} deprecated.`);
  }

  if (alternative.length > 0) {
    messages.push(`Use '${alternative.join(', ')}' instead.`);
  } 

  if (message) {
    messages.push(message);
  }

  console.log(messages.join(' '));
};

export default warnDeprecatedProps;

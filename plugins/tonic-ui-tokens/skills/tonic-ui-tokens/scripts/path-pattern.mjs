const invalidPattern = () => new Error('Invalid selector pattern.');

// Keep bracket keys atomic and reject anything the path grammar does not consume.
function themeParts(path) {
  if (typeof path !== 'string' || path.length === 0) {
    throw invalidPattern();
  }
  const parts = [];
  let position = 0;
  let needSegment = true;

  while (position < path.length) {
    if (!needSegment) {
      if (path[position] === '.') {
        position++;
        if (position === path.length || path[position] === '[') {
          throw invalidPattern();
        }
        needSegment = true;
        continue;
      }
      if (path[position] !== '[') {
        throw invalidPattern();
      }
    }

    if (path[position] === '[') {
      position++;
      const quote = path[position];
      if (quote === '"' || quote === "'") {
        const start = position++;
        let value = '';
        let closed = false;
        while (position < path.length) {
          const character = path[position++];
          if (character === quote) {
            closed = true;
            break;
          }
          if (character === '\\') {
            if (position === path.length) {
              throw invalidPattern();
            }
            const escaped = path[position++];
            if (quote === "'") {
              if (escaped !== "'" && escaped !== '\\') {
                throw invalidPattern();
              }
              value += escaped;
            }
          } else if (quote === "'") {
            value += character;
          }
        }
        if (!closed || path[position] !== ']') {
          throw invalidPattern();
        }
        if (quote === '"') {
          try {
            value = JSON.parse(path.slice(start, position));
          } catch {
            throw invalidPattern();
          }
        }
        position++;
        parts.push({ value, literal: true });
      } else {
        const end = path.indexOf(']', position);
        if (end === -1) {
          throw invalidPattern();
        }
        const value = path.slice(position, end);
        if (!/^-?\d+(?:\.\d*)?$/.test(value)) {
          throw invalidPattern();
        }
        parts.push({ value, literal: true });
        position = end + 1;
      }
    } else {
      const start = position;
      while (position < path.length && !'.[]\'"'.includes(path[position])) {
        position++;
      }
      if (position === start) {
        throw invalidPattern();
      }
      parts.push({ value: path.slice(start, position), literal: false });
    }
    needSegment = false;
  }

  if (needSegment) {
    throw invalidPattern();
  }
  return parts;
}

export function parseThemePath(path) {
  return themeParts(path).map((part) => part.value);
}

export function compilePathPattern(selector, separator) {
  if (separator !== '.' && separator !== '/') {
    throw invalidPattern();
  }
  const parts = separator === '.'
    ? themeParts(selector)
    : (typeof selector === 'string' ? selector.split('/').map((value) => ({ value, literal: false })) : []);
  if (!parts.length || (separator === '/' && parts.some((part) => !part.value))) {
    throw invalidPattern();
  }

  let hasWildcard = false;
  const segments = parts.map(({ value, literal }) => {
    if (!literal && value === '**') {
      hasWildcard = true;
      return { type: 'globstar' };
    }
    if (!literal && value.includes('**')) {
      throw invalidPattern();
    }
    if (!literal && value.includes('*')) {
      hasWildcard = true;
      return { type: 'glob', value };
    }
    return { type: 'literal', value };
  });
  return { segments, hasWildcard };
}

function matchesSegment(pattern, value) {
  let patternIndex = 0;
  let valueIndex = 0;
  let star = -1;
  let starEnd = 0;
  while (valueIndex < value.length) {
    if (pattern[patternIndex] === '*') {
      star = patternIndex++;
      starEnd = valueIndex;
    } else if (patternIndex < pattern.length && pattern[patternIndex] === value[valueIndex]) {
      patternIndex++;
      valueIndex++;
    } else if (star !== -1) {
      patternIndex = star + 1;
      valueIndex = ++starEnd;
    } else {
      return false;
    }
  }
  while (pattern[patternIndex] === '*') {
    patternIndex++;
  }
  return patternIndex === pattern.length;
}

export function matchesPathPattern(compiledPattern, candidateSegments) {
  const { segments } = compiledPattern;
  let previous = Array(segments.length + 1).fill(false);
  previous[0] = true;
  for (let index = 0; index < segments.length; index++) {
    if (previous[index] && segments[index].type === 'globstar') {
      previous[index + 1] = true;
    }
  }

  for (const candidate of candidateSegments) {
    const current = Array(segments.length + 1).fill(false);
    for (let index = 0; index < segments.length; index++) {
      if (!previous[index]) {
        continue;
      }
      const segment = segments[index];
      if (segment.type === 'globstar') {
        current[index] = true;
      } else if (segment.type === 'literal' ? segment.value === candidate : matchesSegment(segment.value, candidate)) {
        current[index + 1] = true;
      }
    }
    for (let index = 0; index < segments.length; index++) {
      if (current[index] && segments[index].type === 'globstar') {
        current[index + 1] = true;
      }
    }
    previous = current;
  }
  return previous[segments.length];
}

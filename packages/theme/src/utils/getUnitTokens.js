const definition = {
  px: {
    quarter: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'q',
      value: 1,
    },
    half: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'h',
      value: 2,
    },
    whole: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 48, 56, 64],
      notation: 'x',
      value: 4,
    },
  },
  rem: {
    quarter: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'q',
      value: 0.0625,
    },
    half: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'h',
      value: 0.125,
    },
    whole: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 48, 56, 64],
      notation: 'x',
      value: 0.25,
    },
  },
};

const getUnitTokens = (unit) => {
  const config = {
    'px': definition.px,
    'rem': definition.rem,
  }[unit] ?? {};

  let accumulatedResult = {};

  Object.keys(config).forEach(key => {
    const { list, notation, value } = { ...config[key] };
    const reducer = (acc, n) => {
      const k = `${n}${notation}`;
      const v = `${(value * n)}${unit}`.replace(/^0+/, ''); // omitting leading '0's
      acc[k] = v;
      return acc;
    };
    const initialValue = {};

    accumulatedResult = {
      ...accumulatedResult,
      ...list.reduce(reducer, initialValue),
    };
  });

  return accumulatedResult;
};

export default getUnitTokens;

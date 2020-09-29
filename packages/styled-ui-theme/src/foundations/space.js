const spaceUnit = 'rem';
const spaceDefinition = {
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
};

// space for margin and padding
const space = (() => {
  let accumulatedSpace = {};

  Object.keys(spaceDefinition).forEach(name => {
    const { list, notation, value } = spaceDefinition[name];
    const reducer = (acc, n) => {
      const k = `${n}${notation}`;
      const v = `${(value * n)}${spaceUnit}`.replace(/^0+/, ''); // omitting leading '0's
      acc[k] = v;
      return acc;
    };
    const initialValue = {};

    accumulatedSpace = {
      ...accumulatedSpace,
      ...list.reduce(reducer, initialValue),
    };
  });

  return accumulatedSpace;
})();

export default space;

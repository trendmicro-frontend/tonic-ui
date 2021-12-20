const splitProps = (props, ...args) => {
  const result = [];
  const mapping = args.reduce((acc, names, index) => {
    for (const name of names) {
      acc[name] = { name, index };
    }
    return acc;
  }, {});
  for (const [key, value] of Object.entries(props)) {
    const def = mapping[key];
    const [index, name] = def
      ? [def.index, def.name]
      : [args.length, key];
    result[index] = {
      ...result[index],
      [name]: value,
    };
  }
  return result;
};

export default splitProps;

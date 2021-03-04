const jsonPrettify = (obj, indent) => {
  if (indent) {
    return JSON.stringify(obj, null, 2)
      .replace(/\"/g, '\'')
      .replace(/\'(\d+|[a-z]+)\':/g, '\ \ $1:')
      .replace(/{/g, '\ {')
      .replace(/}/g, '\ \ }');
  }
  return JSON.stringify(obj, null, 2)
    .replace(/\"/g, '\'')
    .replace(/\'(\d+|[a-z]+)\':/g, '$1:');
};

export default jsonPrettify;

const jsonPrettify = (obj) => {
  return JSON.stringify(obj, null, 2)
    .replace(/"/g, '\'')
    .replace(/'(\d+|[a-z]+)':/g, '$1:');
};

export default jsonPrettify;

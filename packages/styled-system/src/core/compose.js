import parser from './parser';

const compose = (...parsers) => {
  const config = {};

  parsers.forEach(p => {
    if (!p || !p.config) {
      return;
    }
    Object.assign(config, p.config);
  });

  return parser(config);
};

export default compose;

import createParser from './createParser';

const compose = (...parsers) => {
  const config = {};

  parsers.forEach(parser => {
    if (!parser || !parser.config) {
      return;
    }
    Object.assign(config, parser.config);
  });

  const parser = createParser(config);
  return parser;
};

export default compose;

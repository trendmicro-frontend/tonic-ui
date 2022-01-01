import system from '../core/system';

const group = 'list-style';
const config = {
  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true,
};

const listStyle = system(config, { group });

export default listStyle;

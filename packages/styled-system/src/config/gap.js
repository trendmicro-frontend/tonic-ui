import system from '../core/system';

const group = 'gap';
const config = {
  gap: {
    property: 'gap',
    scale: 'sizes',
  },
  columnGap: {
    property: 'columnGap',
    scale: 'sizes',
  },
  rowGap: {
    property: 'rowGap',
    scale: 'sizes',
  },
};

const gap = system(config, { group });

export default gap;

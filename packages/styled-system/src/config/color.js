import system from '../core/system';

const group = 'color';
const config = {
  color: {
    property: 'color',
    scale: 'colors',
  },
  colorScheme: true,
};

const color = system(config, { group });

export default color;

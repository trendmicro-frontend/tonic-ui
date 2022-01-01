import system from '../core/system';

const group = 'effect';
const config = {
  backdropFilter: true,
  backgroundBlendMode: true,
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
  filter: true,
  mixBlendMode: true,
  opacity: true,
};

const effect = system(config, { group });

export default effect;

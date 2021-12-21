import system from '../core/system';

const config = {
  backgroundBlendMode: true,
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
  filter: true,
  mixBlendMode: true,
  opacity: true,
};

const effect = system(config);

export default effect;

import system from '../core/system';

const config = {
  background: {
    property: 'background',
    scale: 'colors',
  },
  backgroundAttachment: {
    property: 'backgroundAttachment',
  },
  backgroundClip: {
    property: 'backgroundClip',
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  backgroundImage: {
    property: 'backgroundImage',
  },
  backgroundPosition: {
    property: 'backgroundPosition',
  },
  backgroundRepeat: {
    property: 'backgroundRepeat',
  },
  backgroundSize: {
    property: 'backgroundSize',
  },
};

config.bg = config.background;
config.bgAttachment = config.backgroundAttachment;
config.bgClip = config.backgroundClip;
config.bgColor = config.backgroundColor;
config.bgImage = config.backgroundImage;
config.bgPosition = config.backgroundPosition;
config.bgRepeat = config.backgroundRepeat;
config.bgSize = config.backgroundSize;

const background = system(config);

export default background;

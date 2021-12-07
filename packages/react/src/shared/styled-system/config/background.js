import { system } from '@styled-system/core';

const config = {
  background: {
    property: 'background',
    scale: 'colors',
  },
  backgroundAttachment: true,
  backgroundClip: true,
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  backgroundImage: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundSize: true,
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

import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const group = 'background';
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
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
  },
  backgroundPositionX: {
    property: 'backgroundPositionX',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  backgroundPositionY: {
    property: 'backgroundPositionY',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  backgroundRepeat: {
    property: 'backgroundRepeat',
  },
  backgroundSize: {
    property: 'backgroundSize',
    scale: 'sizes',
  },
};

config.bg = {
  ...config.background,
  alias: 'background',
};
config.bgAttachment = {
  ...config.backgroundAttachment,
  alias: 'backgroundAttachment',
};
config.bgClip = {
  ...config.backgroundClip,
  alias: 'backgroundClip',
};
config.bgColor = {
  ...config.backgroundColor,
  alias: 'backgroundColor',
};
config.bgImage = {
  ...config.backgroundImage,
  alias: 'backgroundImage',
};
config.bgPosition = {
  ...config.backgroundPosition,
  alias: 'backgroundPosition',
};
config.bgPositionX = {
  ...config.backgroundPositionX,
  alias: 'backgroundPositionX',
};
config.bgPositionY = {
  ...config.backgroundPositionY,
  alias: 'backgroundPositionY',
};
config.bgRepeat = {
  ...config.backgroundRepeat,
  alias: 'backgroundRepeat',
};
config.bgSize = {
  ...config.backgroundSize,
  alias: 'backgroundSize',
};

const background = system(config, { group });

export default background;

import system from '../core/system';

const group = 'transform';
const config = {
  backfaceVisibility: true,
  perspective: true,
  perspectiveOrigin: true,
  transform: true,
  transformBox: true,
  transformOrigin: true,
  transformStyle: true,
};

const transform = system(config, { group });

export default transform;

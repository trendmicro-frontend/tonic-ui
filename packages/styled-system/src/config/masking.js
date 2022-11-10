import system from '../core/system';

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Masking
 */
const group = 'masking';
const config = {
  clip: true, // deprecated: This feature is no longer recommended
  clipPath: true,

  mask: true,
  maskBorder: true,
  maskType: true,

  // The mask property is a shorthand for the following CSS properties:
  maskClip: true,
  maskComposite: true,
  maskImage: true,
  maskMode: true,
  maskOrigin: true,
  maskPosition: true,
  maskRepeat: true,
  maskSize: true,

  // The `mask-border` property is a shorthand for the following CSS properties:
  maskBorderMode: true,
  maskBorderOutset: true,
  maskBorderRepeat: true,
  maskBorderSlice: true,
  maskBorderSource: true,
  maskBorderWidth: true,
};

const masking = system(config, { group });

export default masking;

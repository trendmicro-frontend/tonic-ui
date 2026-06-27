import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

/**
 * @typedef {Object} ImageProps
 * @property {string} [alt] - Specifies an alternate text for the image, if the image for some reason cannot be displayed.
 * @property {string} [src] - Specifies the path to the image.
 */

/**
 * @type {ForwardRefComponent<'img', ImageProps>}
 */
const Image = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Image' });

  return (
    <Box
      ref={ref}
      as="img"
      alt=""
      {...props}
    />
  );
});

Image.displayName = 'Image';

export default Image;

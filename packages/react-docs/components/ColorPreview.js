import { Box } from '@tonic-ui/react';

const ColorPreview = ({ value, ...rest }) => (
  <Box
    display="inline-block"
    width="4x"
    height="4x"
    flexShrink={0}
    border={1}
    borderColor="border.tertiary"
    backgroundColor={value}
    verticalAlign="middle"
    {...rest}
  />
);

export default ColorPreview;

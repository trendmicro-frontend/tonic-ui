import styled from '@emotion/styled';
import Box from '../Box';

const VisuallyHidden = styled(Box)`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;

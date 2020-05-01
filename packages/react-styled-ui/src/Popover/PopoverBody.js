import { usePopover } from './context';
import Box from '../Box';
import { usePopoverBodyStyle } from './styles';

const PopoverBody = props => {
  const { bodyId } = usePopover();
  const bodyStyleProps = usePopoverBodyStyle();
  return (
    <Box
      id={bodyId}
      {...bodyStyleProps}
      {...props}
    />
  );
};

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;

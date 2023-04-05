import { useOnce } from '@tonic-ui/react-hooks';

const PopperArrow = () => {
  useOnce(() => {
    console.error('Error: The `PopperArrow` component has been removed from Tonic UI. Please use the `PopoverArrow` component for popovers or `TooltipArrow` component for tooltips instead.');
  });

  return null;
};

PopperArrow.displayName = 'PopperArrow';

export default PopperArrow;

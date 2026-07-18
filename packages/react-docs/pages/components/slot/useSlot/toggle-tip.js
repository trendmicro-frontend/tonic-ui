import {
  ButtonBase,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useSlot,
} from '@tonic-ui/react';
import { CheckCircleOIcon, InfoOIcon } from '@tonic-ui/react-icons';

const ToggleTip = ({ content, slots = {}, slotProps = {} }) => {
  const [ButtonSlot, buttonSlotProps] = useSlot({
    name: 'button',
    ownerName: 'ToggleTip',
    props: {
      color: 'text.secondary',
      _hover: {
        color: 'text.accent',
      },
    },
    slot: slots.button ?? ButtonBase,
    slotProps: { ...slotProps.button },
  });

  const [IconSlot, iconSlotProps] = useSlot({
    name: 'icon',
    ownerName: 'ToggleTip',
    props: { size: '4x' },
    slot: slots.icon ?? InfoOIcon,
    slotProps: { ...slotProps.icon },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <ButtonSlot {...buttonSlotProps}>
          <IconSlot {...iconSlotProps} />
        </ButtonSlot>
      </PopoverTrigger>
      <PopoverContent>
        {content}
      </PopoverContent>
    </Popover>
  );
};

const App = () => {
  return (
    <Stack display="inline-flex" spacing="4x">
      <Flex columnGap="2x" alignItems="center">
        Default ToggleTip
        <ToggleTip
          content="Default ToggleTip"
        />
      </Flex>
      <Flex columnGap="2x" alignItems="center">
        Custom ToggleTip
        <ToggleTip
          content="Custom ToggleTip"
          slots={{
            button: ButtonBase,
            icon: CheckCircleOIcon,
          }}
          slotProps={{
            button: {
              sx: {
                color: 'text.tertiary',
              },
            },
          }}
        />
      </Flex>
    </Stack>
  );
};

export default App;

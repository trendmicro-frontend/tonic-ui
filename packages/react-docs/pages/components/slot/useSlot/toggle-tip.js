import {
  Button,
  ButtonBase,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorStyle,
  useSlot,
} from '@tonic-ui/react';
import { CheckCircleOIcon, InfoOIcon } from '@tonic-ui/react-icons';

const ToggleTip = ({ content, slots = {}, slotProps = {} }) => {
  const [colorStyle] = useColorStyle();
  const [ButtonSlot, buttonSlotProps] = useSlot({
    name: 'button',
    ownerDisplayName: 'ToggleTip',
    props: {
      color: colorStyle.color.secondary,
      _hover: {
        color: colorStyle.color.primary,
      },
    },
    slot: slots.button ?? ButtonBase,
    slotProps: { ...slotProps.button },
  });

  const [IconSlot, iconSlotProps] = useSlot({
    name: 'icon',
    ownerDisplayName: 'ToggleTip',
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
  const [colorStyle] = useColorStyle();

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
                color: colorStyle.color.tertiary,
              },
            },
          }}
        />
      </Flex>
    </Stack>
  );
};

export default App;

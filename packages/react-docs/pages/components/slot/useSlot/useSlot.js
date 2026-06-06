import { Button, Popover, PopoverTrigger, PopoverContent, Stack, useSlot } from '@tonic-ui/react';
import { CheckCircleOIcon, InfoOIcon } from '@tonic-ui/react-icons';

const ToggleTip = ({ content, slots = {}, slotProps = {} }) => {
  const [ButtonSlot, buttonSlotProps] = useSlot({
    name: 'button',
    ownerDisplayName: 'ToggleTip',
    props: { variant: 'ghost' },
    slot: slots.button ?? Button,
    slotProps: slotProps.button ?? {},
  });

  const [IconSlot, iconSlotProps] = useSlot({
    name: 'icon',
    ownerDisplayName: 'ToggleTip',
    props: { size: '4x' },
    slot: slots.icon ?? InfoOIcon,
    slotProps: slotProps.icon ?? {},
  });

  return (
    <Popover>
      <PopoverTrigger>
        <ButtonSlot {...buttonSlotProps}>
          <IconSlot {...iconSlotProps} />
        </ButtonSlot>
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};

const App = () => (
  <Stack display="inline-flex" spacing="4x">
    <ToggleTip
      content="Default toggle tip"
    />
    <ToggleTip
      content="Custom toggle tip"
      slots={{ icon: CheckCircleOIcon }}
      slotProps={{
        button: {
          variant: 'secondary',
          color: 'text.secondary',
          '&:hover': {
            color: 'text.accent',
          },
        },
      }}
    />
  </Stack>
);

export default App;

import {
  Box,
  Flex,
  InputAdornment,
  InputControl,
  Stack,
  Text,
  useColorMode,
  useSlot,
} from '@tonic-ui/react';
import {
  CheckCircleOIcon,
  InfoOIcon,
  WarningMinorIcon,
} from '@tonic-ui/react-icons';
import { forwardRef } from 'react';

/**
 * StatusLabel — a component built with useSlot.
 *
 * The `icon` slot defaults to InfoOIcon. Consumers can:
 *   - Swap the icon element via `slots.icon`
 *   - Pass extra props (color, size, aria-label) via `slotProps.icon`
 *
 * Internal props (`size`) are set inside `props` so they can still be
 * overridden by the user through `slotProps.icon`.
 */
const StatusLabel = forwardRef(function StatusLabel(
  { label, slots = {}, slotProps = {}, ...rest },
  ref,
) {
  const [IconSlot, iconSlotProps] = useSlot({
    name: 'icon',
    ownerDisplayName: 'StatusLabel',
    props: { size: '4x' },          // internal default — overridable via slotProps.icon
    slot: slots.icon ?? InfoOIcon,
    slotProps: slotProps.icon ?? {},
  });

  return (
    <Flex ref={ref} alignItems="center" columnGap="2x" {...rest}>
      <IconSlot {...iconSlotProps} />
      <Text>{label}</Text>
    </Flex>
  );
});

/**
 * SearchField — a component with TWO slots: `startAdornment` and `input`.
 *
 * Shows how a single component can expose multiple independent slots so
 * consumers can customize each internal element separately.
 */
const SearchField = forwardRef(function SearchField(
  { placeholder = 'Search…', slots = {}, slotProps = {}, ...rest },
  ref,
) {
  const [colorMode] = useColorMode();
  const iconColor = { dark: 'white:secondary', light: 'black:secondary' }[colorMode];

  const [AdornmentSlot, adornmentSlotProps] = useSlot({
    name: 'startAdornment',
    ownerDisplayName: 'SearchField',
    props: { color: iconColor },
    slot: slots.startAdornment ?? InfoOIcon,
    slotProps: slotProps.startAdornment ?? {},
  });

  return (
    <InputControl
      ref={ref}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment>
          <AdornmentSlot size="4x" {...adornmentSlotProps} />
        </InputAdornment>
      }
      {...rest}
    />
  );
});

const App = () => (
  <Stack spacing="8x">

    {/* ── Demo 1: element swap ─────────────────────────────────────── */}
    <Box>
      <Text mb="1x" fontWeight="semibold">1. Swap the slot element</Text>
      <Text mb="3x" color="gray:50" fontSize="sm">
        Replace the default icon with any element via <code>slots.icon</code>.
      </Text>
      <Stack spacing="3x">
        <StatusLabel label="Default — InfoOIcon (no slots prop)" />
        <StatusLabel
          label="Success — CheckCircleOIcon"
          slots={{ icon: CheckCircleOIcon }}
        />
        <StatusLabel
          label="Warning — WarningMinorIcon"
          slots={{ icon: WarningMinorIcon }}
        />
      </Stack>
    </Box>

    {/* ── Demo 2: slotProps forwarding & merge ─────────────────────── */}
    <Box>
      <Text mb="1x" fontWeight="semibold">2. Forward and merge props via slotProps</Text>
      <Text mb="3x" color="gray:50" fontSize="sm">
        Internal <code>props</code> (e.g. <code>size="4x"</code>) merge with the user's{' '}
        <code>slotProps.icon</code>. The user wins on conflict.
      </Text>
      <Stack spacing="3x">
        <StatusLabel
          label="Larger icon — slotProps overrides size to 6x"
          slots={{ icon: CheckCircleOIcon }}
          slotProps={{ icon: { color: 'green:50', size: '6x' } }}
        />
        <StatusLabel
          label="Colored icon — slotProps adds color without touching size"
          slots={{ icon: WarningMinorIcon }}
          slotProps={{ icon: { color: 'yellow:50' } }}
        />
        <StatusLabel
          label="ARIA label — slotProps adds aria-label for screen readers"
          slots={{ icon: InfoOIcon }}
          slotProps={{ icon: { 'aria-label': 'Information', color: 'blue:50' } }}
        />
      </Stack>
    </Box>

    {/* ── Demo 3: multiple slots in one component ───────────────────── */}
    <Box>
      <Text mb="1x" fontWeight="semibold">3. Multiple independent slots</Text>
      <Text mb="3x" color="gray:50" fontSize="sm">
        A single component can expose several slots. Each is independently swappable.
      </Text>
      <Stack spacing="3x">
        <SearchField placeholder="Default adornment (InfoOIcon)" />
        <SearchField
          placeholder="Adornment swapped to CheckCircleOIcon"
          slots={{ startAdornment: CheckCircleOIcon }}
          slotProps={{ startAdornment: { color: 'green:50' } }}
        />
        <SearchField
          placeholder="Adornment swapped to WarningMinorIcon"
          slots={{ startAdornment: WarningMinorIcon }}
          slotProps={{ startAdornment: { color: 'yellow:50' } }}
        />
      </Stack>
    </Box>

  </Stack>
);

export default App;

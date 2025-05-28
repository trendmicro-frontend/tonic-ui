import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Scrollbar,
  Stack,
  TextLabel,
  Tooltip,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import {
  InfoOIcon,
} from '@tonic-ui/react-icons';
import { produce } from 'immer';
import React, { useMemo, useState } from 'react';
import FormGroup from '@/components/FormGroup';
import { Dropdown, InputControlToggle, MenuButtonToggle, TagToggle } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const DROPDOWN_TOGGLE_INPUT_CONTROL = 'InputControl';
const DROPDOWN_TOGGLE_MENU_BUTTON = 'MenuButton';
const DROPDOWN_TOGGLE_TAG = 'Tag';

const App = () => {
  const [width, changeWidthBy] = useSelection('auto');
  const [toggle, changeToggleBy] = useSelection(DROPDOWN_TOGGLE_MENU_BUTTON);
  const ToggleComponent = {
    [DROPDOWN_TOGGLE_INPUT_CONTROL]: InputControlToggle,
    [DROPDOWN_TOGGLE_MENU_BUTTON]: MenuButtonToggle,
    [DROPDOWN_TOGGLE_TAG]: TagToggle,
  }[toggle];
  const [togglePropsMap, setTogglePropsMap] = useState({
    [DROPDOWN_TOGGLE_INPUT_CONTROL]: {
      disabled: false,
    },
    [DROPDOWN_TOGGLE_MENU_BUTTON]: {
      disabled: false,
    },
    [DROPDOWN_TOGGLE_TAG]: {
      disabled: false,
      isClosable: true,
    },
  });
  const toggleOffset = (toggle === DROPDOWN_TOGGLE_TAG) ? [0, 4] : undefined;
  const toggleProps = togglePropsMap[toggle];
  const setToggleProps = (updater) => {
    setTogglePropsMap((prevState) => produce(prevState, draft => updater(draft[toggle])));
  };
  const [value, setValue] = useState('all');
  const items = useConst(() => [
    { value: 'all', label: 'All' },
    { value: 'network', label: 'Network events' },
    { value: 'system', label: 'System events' },
  ]);
  const itemValueToLabelMap = useMemo(() => {
    return Object.fromEntries(items.map(item => [item.value, item.label]));
  }, [items]);

  const handleSelect = (item) => {
    if (value !== item.value) {
      setValue(item.value);
    }
  };

  const renderValue = (value) => {
    const label = itemValueToLabelMap[value];

    if (toggle === DROPDOWN_TOGGLE_INPUT_CONTROL) {
      return `Event status: ${label}`;
    }

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem
          as={MutedText}
          fixed
          tooltip={`Event status: ${label}`}
        >
          {'Event status:'}
        </FlexItem>
        <FlexItem tooltip>
          {label}
        </FlexItem>
      </Flex>
    );
  };

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              Dropdown width:
            </TextLabel>
            <Tooltip label="Try changing the dropdown width to see how the overflow tooltip behaves.">
              <InfoOIcon />
            </Tooltip>
          </Flex>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            },
            mb: '1x',
          }}
        >
          {['auto', '80px', '160px', '100%'].map(value => (
            <Button
              key={value}
              selected={value === width}
              onClick={changeWidthBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Box mb="2x">
        <MutedText>
          Dropdown toggle component:
        </MutedText>
      </Box>
      <FormGroup>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            },
            mb: '1x',
          }}
        >
          {[DROPDOWN_TOGGLE_INPUT_CONTROL, DROPDOWN_TOGGLE_MENU_BUTTON, DROPDOWN_TOGGLE_TAG].map(value => (
            <Button
              key={value}
              selected={value === toggle}
              onClick={changeToggleBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Stack spacing="2x" shouldWrapChildren>
          <MutedText>
            Dropdown toggle props:
          </MutedText>
          <Checkbox
            checked={toggleProps.disabled}
            onChange={() => {
              setToggleProps(draftToggleProps => {
                draftToggleProps.disabled = !draftToggleProps.disabled;
              });
            }}
          >
            <MutedText fontFamily="mono" whiteSpace="nowrap">disabled</MutedText>
          </Checkbox>
          {toggle === DROPDOWN_TOGGLE_TAG && (
            <Checkbox
              checked={toggleProps.isClosable}
              onChange={() => {
                setToggleProps(draftToggleProps => {
                  draftToggleProps.isClosable = !draftToggleProps.isClosable;
                });
              }}
            >
              <MutedText fontFamily="mono" whiteSpace="nowrap">isClosable</MutedText>
            </Checkbox>
          )}
        </Stack>
      </FormGroup>
      <Divider my="4x" />
      <Dropdown
        offset={toggleOffset}
        onSelect={handleSelect}
        items={items}
        renderContent={({ items, renderItems }) => (
          <Scrollbar
            maxHeight={200}
            overflowY="auto"
          >
            {renderItems(items)}
          </Scrollbar>
        )}
        slots={{
          // You can omit `slots.toggle` if you're using the default toggle component
          toggle: ToggleComponent,
        }}
        slotProps={{
          // Additional props to pass to the toggle component
          toggle: toggleProps,
        }}
        width={width}
      >
        {renderValue(value)}
      </Dropdown>
    </>
  );
};

export default App;

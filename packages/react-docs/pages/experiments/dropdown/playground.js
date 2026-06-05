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
import { useState } from 'react';
import FormGroup from '@/components/FormGroup';
import { Dropdown, MenuButtonToggle, TagToggle } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const DROPDOWN_TOGGLE_MENU_BUTTON = 'MenuButton';
const DROPDOWN_TOGGLE_TAG = 'Tag';

const App = () => {
  const [width, changeWidthBy] = useSelection('auto');
  const [toggle, changeToggleBy] = useSelection(DROPDOWN_TOGGLE_MENU_BUTTON);
  const ToggleComponent = {
    [DROPDOWN_TOGGLE_MENU_BUTTON]: MenuButtonToggle,
    [DROPDOWN_TOGGLE_TAG]: TagToggle,
  }[toggle];
  const [togglePropsMap, setTogglePropsMap] = useState({
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
  const [matchWidth, setMatchWidth] = useState(false);
  const items = useConst(() => [
    { id: 'all', label: 'All' },
    { id: 'network', label: 'Network events' },
    { id: 'system', label: 'System events' },
  ]);
  const [value, setValue] = useState(items[0]);

  const handleChange = (item) => {
    if (value !== item) {
      setValue(item);
    }
  };

  const renderValue = (item) => {
    const label = item?.label ?? '';

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem
          as={MutedText}
          fixed
          tooltip={`Event status: ${label}`}
        >
          Event status:
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
          {['MenuButton', 'Tag'].map(value => (
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
      <FormGroup>
        <Stack spacing="2x" shouldWrapChildren>
          <MutedText>
            Dropdown content props:
          </MutedText>
          <Checkbox
            checked={matchWidth}
            onChange={() => setMatchWidth(prev => !prev)}
          >
            <MutedText fontFamily="mono" whiteSpace="nowrap">matchWidth</MutedText>
          </Checkbox>
        </Stack>
      </FormGroup>
      <Divider my="4x" />
      <Dropdown
        sx={{
          width,
        }}
        matchWidth={matchWidth}
        offset={toggleOffset}
        value={value}
        onChange={handleChange}
        items={items}
        renderContent={({ items, renderItems }) => (
          <Scrollbar
            maxHeight={200}
            overflowY="auto"
          >
            {renderItems(items)}
          </Scrollbar>
        )}
        renderToggle={({ getToggleProps, value: selectedValue }) => (
          <ToggleComponent {...getToggleProps(toggleProps)}>
            {renderValue(selectedValue)}
          </ToggleComponent>
        )}
      />
    </>
  );
};

export default App;

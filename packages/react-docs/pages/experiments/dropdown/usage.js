import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Scrollbar,
  TextLabel,
  Tooltip,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import {
  InfoOIcon,
} from '@tonic-ui/react-icons';
import React, { useMemo, useState } from 'react';
import FormGroup from '@/components/FormGroup';
import { Dropdown } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import MenuButtonToggle from '../shared/MenuButtonToggle';
import TagToggle from '../shared/TagToggle';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [width, changeWidthBy] = useSelection('auto');
  const [toggle, changeToggleBy] = useSelection('MenuButton');
  const [value, setValue] = useState('all');
  const offset = (toggle === 'Tag') ? [0, 4] : undefined;
  const ToggleComponent = {
    'MenuButton': MenuButtonToggle,
    'Tag': TagToggle,
  }[toggle];

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
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              Dropdown toggle:
            </TextLabel>
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
      <Divider my="4x" />
      <Dropdown
        offset={offset}
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
        toggle={ToggleComponent} // No need to specify the `toggle` prop if you're using the default toggle
        width={width}
      >
        {renderValue(value)}
      </Dropdown>
    </>
  );
};

export default App;

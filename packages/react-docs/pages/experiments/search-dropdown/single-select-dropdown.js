import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Scrollbar,
  TextLabel,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import Chance from 'chance';
import { ensureArray } from 'ensure-type';
import React, { useMemo, useState } from 'react';
import Highlight from 'react-highlight-words';
import FormGroup from '@/components/FormGroup';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import { SearchDropdown } from '@/experiments/search-dropdown';
import MenuButtonToggle from '../shared/MenuButtonToggle';
import TagToggle from '../shared/TagToggle';

const chance = new Chance();

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [toggle, changeToggleBy] = useSelection('MenuButton');
  const toggleOffset = (toggle === 'Tag') ? [0, 4] : undefined;
  const ToggleComponent = {
    'MenuButton': MenuButtonToggle,
    'Tag': TagToggle,
  }[toggle];

  const items = useConst(() => {
    return [
      { value: 'all', label: 'All' },
      ...chance.unique(chance.company, 20).map((value, index) => {
        return {
          value: `${index}_${value.toLowerCase()}`,
          label: value,
        };
      }),
    ];
  });
  const itemValueToLabelMap = useMemo(() => {
    return Object.fromEntries(items.map(item => [item.value, item.label]));
  }, [items]);

  const [value, setValue] = useState(items[0]?.value);

  const handleSelect = (item) => {
    if (value !== item.value) {
      setValue(item.value);
    }
  };

  const renderValue = (value) => {
    const label = itemValueToLabelMap[value];
    const tooltip = `Company: ${label}`;

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem as={MutedText} fixed tooltip={tooltip}>
          {'Company:'}
        </FlexItem>
        <FlexItem maxWidth={120} tooltip>
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
      <SearchDropdown
        offset={toggleOffset}
        onSelect={handleSelect}
        items={items}
        renderContent={({ items, renderItems, renderSearchInput }) => (
          <>
            <Box px="3x" mb="2x">
              {renderSearchInput()}
            </Box>
            <Scrollbar
              maxHeight={36 * 5}
              overflowY="visible"
            >
              {renderItems(items)}
            </Scrollbar>
          </>
        )}
        renderItem={(item, { searchKeyword }) => {
          const searchWords = ensureArray(searchKeyword);
          const textToHighlight = item.label;
          const highlightStyle = {
            backgroundColor: 'inherit',
            color: colorStyle.color.emphasis,
            fontWeight: 'semibold',
          };

          return (
            <Highlight
              searchWords={searchWords}
              textToHighlight={textToHighlight}
              highlightTag={(props) => <Box as="mark" {...highlightStyle} {...props} />}
            />
          );
        }}
        toggle={ToggleComponent}
      >
        {renderValue(value)}
      </SearchDropdown>
    </>
  );
};

export default App;

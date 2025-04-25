import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  LinkButton,
  Scrollbar,
  TextLabel,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import Chance from 'chance';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useMemo, useState } from 'react';
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

  const [values, setValues] = useState(items.map(item => item.value));
  const isAllSelected = values.length === items.length;
  const isNoneSelected = values.length === 0;

  const onCheckboxGroupChange = useCallback((nextValues) => {
    setValues(nextValues);
  }, []);

  const handleClickToggleAll = (event) => {
    const nextValues = isAllSelected ? [] : items.map(item => item.value);
    setValues(nextValues);
  };

  const renderValues = (values) => {
    const selectionCount = values.length;
    const isNoneSelected = selectionCount === 0;
    const isAllSelected = selectionCount === items.length;

    if (isNoneSelected) {
      const tooltip = 'Company: Select';
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FlexItem as={MutedText} fixed tooltip={tooltip}>
            {'Company:'}
          </FlexItem>
          <FlexItem maxWidth={120} tooltip>
            {'Select'}
          </FlexItem>
        </Flex>
      );
    }

    if (isAllSelected) {
      const tooltip = 'Company: All';
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FlexItem as={MutedText} fixed tooltip={tooltip}>
            {'Company:'}
          </FlexItem>
          <FlexItem maxWidth={120} tooltip>
            {'All'}
          </FlexItem>
        </Flex>
      );
    }

    const labels = values.map(value => itemValueToLabelMap[value]);
    const selectionText = labels.join(', ');
    const tooltip = `Company: ${selectionText} (${selectionCount})`;

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem as={MutedText} fixed tooltip={tooltip}>
          {'Company:'}
        </FlexItem>
        <FlexItem maxWidth={120} tooltip>
          {selectionText}
        </FlexItem>
        <FlexItem fixed>
          {`(${selectionCount})`}
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
        closeOnSelect={false}
        offset={toggleOffset}
        onClose={() => {
          if (isNoneSelected) {
            // Automatically reset all the items when the menu loses focus
            setValues(items.map(item => item.value));
          }
        }}
        items={items}
        renderContent={({ items, renderItems, renderSearchInput, searchKeyword }) => (
          <>
            <Box px="3x" mb="2x">
              {renderSearchInput()}
            </Box>
            {!searchKeyword && (
              <Box
                px="3x"
                mb="2x"
              >
                <LinkButton
                  onClick={handleClickToggleAll}
                >
                  {isAllSelected ? ('Clear all') : ('Select all')}
                </LinkButton>
              </Box>
            )}
            <CheckboxGroup
              size="sm"
              value={values}
              onChange={onCheckboxGroupChange}
            >
              <Scrollbar
                maxHeight={36 * 5}
                overflowY="visible"
              >
                {renderItems(items)}
              </Scrollbar>
            </CheckboxGroup>
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
            <Checkbox
              value={item.value}
              width="100%"
            >
              <Highlight
                searchWords={searchWords}
                textToHighlight={textToHighlight}
                highlightTag={(props) => <Box as="mark" {...highlightStyle} {...props} />}
              />
            </Checkbox>
          );
        }}
        toggle={ToggleComponent}
      >
        {renderValues(values)}
      </SearchDropdown>
    </>
  );
};

export default App;

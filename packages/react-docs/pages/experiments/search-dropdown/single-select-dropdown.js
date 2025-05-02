import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Scrollbar,
  Stack,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import Chance from 'chance';
import { ensureArray } from 'ensure-type';
import { produce } from 'immer';
import React, { useMemo, useState } from 'react';
import Highlight from 'react-highlight-words';
import FormGroup from '@/components/FormGroup';
import { MenuButtonToggle, TagToggle } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import { SearchDropdown } from '@/experiments/search-dropdown';

const chance = new Chance();

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const DROPDOWN_TOGGLE_MENU_BUTTON = 'MenuButton';
const DROPDOWN_TOGGLE_TAG = 'Tag';

const App = () => {
  const [colorStyle] = useColorStyle();
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
        slots={{
          toggle: ToggleComponent,
        }}
        slotProps={{
          // Additional props to pass to the toggle component
          toggle: toggleProps,
        }}
      >
        {renderValue(value)}
      </SearchDropdown>
    </>
  );
};

export default App;

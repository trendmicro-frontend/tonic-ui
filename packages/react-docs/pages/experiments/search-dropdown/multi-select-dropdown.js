import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Highlight,
  LinkButton,
  Scrollbar,
  Stack,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import Chance from 'chance';
import { produce } from 'immer';
import { useCallback, useMemo, useState } from 'react';
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
        closeOnSelect={false}
        items={items}
        offset={toggleOffset}
        onClose={() => {
          if (isNoneSelected) {
            // Automatically reset all the items when the menu loses focus
            setValues(items.map(item => item.value));
          }
        }}
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
            {items.length === 0 ? (
              <Box px="3x" py="2x">No options</Box>
            ) : (
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
            )}
          </>
        )}
        renderItem={(item, { searchKeyword }) => (
          <Checkbox
            value={item.value}
            width="100%"
          >
            <Highlight variant="highlight" query={searchKeyword}>
              {item.label}
            </Highlight>
          </Checkbox>
        )}
        slots={{
          toggle: ToggleComponent,
        }}
        slotProps={{
          // Additional props to pass to the toggle component
          toggle: toggleProps,
        }}
      >
        {renderValues(values)}
      </SearchDropdown>
    </>
  );
};

export default App;

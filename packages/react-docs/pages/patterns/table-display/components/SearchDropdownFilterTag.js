import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  LinkButton,
  Scrollbar,
  useColorStyle,
} from '@tonic-ui/react';
import { useEffectOnce, useToggle } from '@tonic-ui/react-hooks';
import { ensureArray, ensureFunction } from 'ensure-type';
import { forwardRef, useMemo, useState } from 'react';
import Highlight from 'react-highlight-words';
import { SearchDropdown } from '@/experiments/search-dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import FilterTag from './FilterTag';

const SearchDropdownFilterTag = forwardRef((
  {
    label,
    onClose,
    onChange,
    items = [],
    value = [],
    ...rest
  },
  ref,
) => {
  const itemValueToLabelMap = useMemo(() => {
    return Object.fromEntries(items.map(item => [item.value, item.label]));
  }, [items]);
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffectOnce(() => {
    // Automatically open the menu on initial render
    toggleIsOpen(true);
  });

  const [colorStyle] = useColorStyle();

  const [selectedValues, setSelectedValues] = useState(items.map(item => item.value));
  const selectionCount = selectedValues.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === items.length;

  const handleClose = () => {
    toggleIsOpen(false);

    if (isNoneSelected) {
      const allValues = items.map(item => item.value);
      setSelectedValues(allValues);
      ensureFunction(onChange)(allValues);
    } else {
      ensureFunction(onChange)(selectedValues);
    }
  };

  const handleOpen = () => {
    toggleIsOpen(true);
  };

  const renderValue = () => {
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

    const selectionText = selectedValues.map(value => itemValueToLabelMap[value]).join(', ');
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

  const FilterTagToggle = useMemo(() => {
    const Component = forwardRef((props, ref) => (
      <FilterTag ref={ref} {...props} onClose={onClose} />
    ));
    Component.displayName = 'FilterTagToggle';
    return Component;
  }, [onClose]);

  return (
    <SearchDropdown
      closeOnSelect={false}
      isOpen={isOpen}
      offset={[0, 4]}
      onClose={handleClose}
      onOpen={handleOpen}
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
                onClick={() => {
                  if (isAllSelected) {
                    setSelectedValues([]);
                  } else {
                    const allValues = items.map(item => item.value);
                    setSelectedValues(allValues);
                  }
                }}
              >
                {isAllSelected ? ('Clear all') : ('Select all')}
              </LinkButton>
            </Box>
          )}
          <CheckboxGroup
            size="sm"
            value={selectedValues}
            onChange={(value) => {
              setSelectedValues(value);
            }}
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
      slots={{
        toggle: FilterTagToggle,
      }}
      {...rest}
    >
      {renderValue()}
    </SearchDropdown>
  );
});

SearchDropdownFilterTag.displayName = 'SearchDropdownFilterTag';

export default SearchDropdownFilterTag;

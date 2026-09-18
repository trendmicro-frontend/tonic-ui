import {
  Box,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  Flex,
  Highlight,
  LinkButton,
  Scrollbar,
  SearchInput,
} from '@tonic-ui/react';
import { useEffectOnce, useToggle } from '@tonic-ui/react-hooks';
import { ensureArray, ensureFunction, ensureString } from 'ensure-type';
import { forwardRef, useMemo, useState } from 'react';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import FilterTag from './FilterTag';

const SearchDropdownFilterTag = forwardRef((
  {
    label,
    onClose,
    onChange,
    items = [],
    renderLabel,
    value = [],
    ...rest
  },
  ref,
) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffectOnce(() => {
    // Automatically open the menu on initial render
    toggleIsOpen(true);
  });

  const [selectedValues, setSelectedValues] = useState([]);
  const selectionCount = selectedValues.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === items.length;
  const selectedItems = useMemo(() => {
    return items.filter(item => selectedValues.includes(item.value));
  }, [items, selectedValues]);

  const handleClose = () => {
    toggleIsOpen(false);
    setSearchKeyword('');

    if (isNoneSelected) {
      ensureFunction(onClose)();
    } else {
      ensureFunction(onChange)(selectedValues);
    }
  };

  const handleOpen = () => {
    toggleIsOpen(true);
  };

  const FilterTagToggle = useMemo(() => {
    // eslint-disable-next-line react/no-unstable-nested-components -- memoized wrapper passed as slot prop
    const Component = forwardRef((props, ref) => (
      <FilterTag ref={ref} {...props} onClose={onClose} />
    ));
    Component.displayName = 'FilterTagToggle';
    return Component;
  }, [onClose]);

  const normalizedSearchKeyword = ensureString(searchKeyword).trim().toLowerCase();
  const filteredItems = items.filter(item => {
    if (!normalizedSearchKeyword) {
      return true;
    }
    return ensureString(item?.label).trim().toLowerCase().includes(normalizedSearchKeyword);
  });

  const renderSearchInput = () => (
    <SearchInput
      inputProps={{
        role: 'menuitem',
        onKeyDown: (event) => {
          const input = event.target;
          const { selectionStart, selectionEnd, value } = input;
          const isAtStart = (selectionStart === 0 && selectionEnd === 0);
          const isAtEnd = (selectionStart === value.length && selectionEnd === value.length);

          if (isAtStart && ['ArrowUp', 'Home'].includes(event.key)) {
            return;
          }
          if (isAtEnd && ['ArrowDown', 'End'].includes(event.key)) {
            return;
          }

          event.stopPropagation();
        },
      }}
      value={searchKeyword}
      onClearInput={() => setSearchKeyword('')}
      onChange={(event) => setSearchKeyword(event.target.value)}
    />
  );

  const defaultRenderLabel = ({ label, items, selectedItems, isNoneSelected, isAllSelected }) => {
    if (isNoneSelected) {
      const tooltip = `${label} Select`;
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FlexItem as={MutedText} fixed tooltip={tooltip}>
            {label}
          </FlexItem>
          <FlexItem maxWidth={120} tooltip>
            Select
          </FlexItem>
        </Flex>
      );
    }

    if (isAllSelected) {
      const tooltip = `${label} All`;
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FlexItem as={MutedText} fixed tooltip={tooltip}>
            {label}
          </FlexItem>
          <FlexItem maxWidth={120} tooltip>
            All
          </FlexItem>
        </Flex>
      );
    }

    const selectionText = selectedItems.map(item => item.label).join(', ');
    const tooltip = `${label} ${selectionText} (${selectedItems.length})`;

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem as={MutedText} fixed tooltip={tooltip}>
          {label}
        </FlexItem>
        <FlexItem maxWidth={120} tooltip>
          {selectionText}
        </FlexItem>
        <FlexItem fixed>
          {`(${selectedItems.length})`}
        </FlexItem>
      </Flex>
    );
  };
  const resolveRenderLabel = (typeof renderLabel === 'function') ? renderLabel : defaultRenderLabel;

  return (
    <Dropdown
      closeOnSelect={false}
      isOpen={isOpen}
      offset={[0, 4]}
      onClose={handleClose}
      onOpen={handleOpen}
      items={filteredItems}
      renderContent={({ renderItems }) => (
        <>
          <Box px="3x" mb="2x">
            {renderSearchInput()}
          </Box>
          {!searchKeyword && (
            <Box px="3x" mb="2x">
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
                {isAllSelected ? 'Clear all' : 'Select all'}
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
            <Scrollbar maxHeight={36 * 5} overflowY="visible">
              {renderItems(filteredItems)}
            </Scrollbar>
          </CheckboxGroup>
        </>
      )}
      renderItem={(item) => {
        const searchWords = ensureArray(searchKeyword);

        return (
          <Checkbox value={item.value} width="100%">
            <Highlight query={searchWords}>
              {item.label}
            </Highlight>
          </Checkbox>
        );
      }}
      renderToggle={({ getToggleProps }) => {
        const toggleProps = getToggleProps({});
        return (
          <FilterTagToggle {...toggleProps}>
            {resolveRenderLabel({ label, items, selectedItems, isNoneSelected, isAllSelected })}
          </FilterTagToggle>
        );
      }}
      {...rest}
    />
  );
});

SearchDropdownFilterTag.displayName = 'SearchDropdownFilterTag';

export default SearchDropdownFilterTag;

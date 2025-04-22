import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  LinkButton,
  MenuButton,
  OverflowTooltip,
  Scrollbar,
  Tag,
  Text,
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
import MutedText from '@/components/MutedText';
import SearchDropdown from '@/components/SearchDropdown';

const chance = new Chance();

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const AutoWidthText = ({ children, tooltip, variant, ...rest }) => {
  const TextComponent = (variant === 'muted') ? MutedText : Text;

  return (
    <OverflowTooltip
      PopperProps={{
        usePortal: true,
      }}
      label={tooltip ?? children}
      maxWidth={320}
    >
      {({ ref, style }) => (
        <TextComponent
          ref={ref}
          {...style}
          flex="auto"
          {...rest}
        >
          {children}
        </TextComponent>
      )}
    </OverflowTooltip>
  );
};

const FixedWidthText = ({ children, tooltip, variant, ...rest }) => {
  const TextComponent = (variant === 'muted') ? MutedText : Text;

  return (
    <OverflowTooltip
      PopperProps={{
        usePortal: true,
      }}
      label={tooltip ?? children}
      maxWidth={320}
    >
      {({ ref, style }) => (
        <TextComponent
          ref={ref}
          {...style}
          maxWidth="100%"
          flex="none"
          {...rest}
        >
          {children}
        </TextComponent>
      )}
    </OverflowTooltip>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [toggler, changeTogglerBy] = useSelection('MenuButton');
  const togglerOffset = (toggler === 'Tag') ? [0, 4] : undefined;

  const options = useConst(() => {
    return [
      ...chance.unique(chance.company, 20).map((value, index) => {
        return {
          value: `${index}_${value.toLowerCase()}`,
          label: value,
        };
      }),
    ];
  });
  const optionValueToLabelMap = useMemo(() => {
    return Object.fromEntries(options.map(option => [option.value, option.label]));
  }, [options]);

  const [values, setValues] = useState(options.map(option => option.value));
  const isAllSelected = values.length === options.length;
  const isNoneSelected = values.length === 0;

  const onCheckboxGroupChange = useCallback((nextValues) => {
    setValues(nextValues);
  }, []);

  const handleClickToggleAll = (event) => {
    const nextValues = isAllSelected ? [] : options.map(option => option.value);
    setValues(nextValues);
  };

  const renderValues = (values) => {
    const selectionCount = values.length;
    const isNoneSelected = selectionCount === 0;
    const isAllSelected = selectionCount === options.length;

    if (isNoneSelected) {
      const tooltip = 'Company: Select';
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FixedWidthText variant="muted" tooltip={tooltip}>
            {'Company:'}
          </FixedWidthText>
          <AutoWidthText maxWidth={120}>
            {'Select'}
          </AutoWidthText>
        </Flex>
      );
    }

    if (isAllSelected) {
      const tooltip = 'Company: All';
      return (
        <Flex alignItems="center" columnGap="1x" width="100%">
          <FixedWidthText variant="muted" tooltip={tooltip}>
            {'Company:'}
          </FixedWidthText>
          <AutoWidthText maxWidth={120}>
            {'All'}
          </AutoWidthText>
        </Flex>
      );
    }

    const labels = values.map(value => optionValueToLabelMap[value]);
    const selectionText = labels.join(', ');
    const tooltip = `Company: ${selectionText} (${selectionCount})`;

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FixedWidthText variant="muted" tooltip={tooltip}>
          {'Company:'}
        </FixedWidthText>
        <AutoWidthText maxWidth={120}>
          {selectionText}
        </AutoWidthText>
        <FixedWidthText>
          {`(${selectionCount})`}
        </FixedWidthText>
      </Flex>
    );
  };

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              Dropdown toggler:
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
              selected={value === toggler}
              onClick={changeTogglerBy(value)}
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
        offset={togglerOffset}
        onClose={() => {
          if (isNoneSelected) {
            // Automatically reset all the options when the menu loses focus
            setValues(options.map(option => option.value));
          }
        }}
        options={options}
        renderContent={({ options, renderOptions, renderSearchInput, searchKeyword }) => (
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
                {renderOptions(options)}
              </Scrollbar>
            </CheckboxGroup>
          </>
        )}
        renderOption={(option, { searchKeyword }) => {
          const searchWords = ensureArray(searchKeyword);
          const textToHighlight = option.label;
          const highlightStyle = {
            backgroundColor: 'inherit',
            color: colorStyle.color.emphasis,
            fontWeight: 'semibold',
          };

          return (
            <Checkbox
              value={option.value}
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
        toggleProps={{
          // Tip: If you're using the default `MenuButton` as the toggle, there's no need to manually provide the `sx` below.
          sx: {
            maxWidth: '100%',
            width: '100%',
            '> :first-of-type': {
              // Override flex item's default `minWidth: auto` to allow text truncation
              minWidth: 0,
            },
          },
        }}
      >
        {({ getToggleProps }) => {
          const { sx, ...restToggleProps } = getToggleProps();

          if (toggler === 'MenuButton') {
            return (
              <MenuButton
                {...restToggleProps}
                variant="secondary"
                sx={sx}
              >
                {renderValues(values)}
              </MenuButton>
            );
          }

          if (toggler === 'Tag') {
            return (
              <Tag
                {...restToggleProps}
                isClosable={true}
                onClose={(event) => {
                  event.preventDefault();
                }}
                sx={[sx, { cursor: 'pointer' }]}
              >
                {renderValues(values)}
              </Tag>
            );
          }
        }}
      </SearchDropdown>
    </>
  );
};

export default App;

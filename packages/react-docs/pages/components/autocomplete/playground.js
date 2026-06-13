import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Code,
  Divider,
  Flex,
  Grid,
  Highlight,
  List,
  ListItem,
  Text,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import { useState } from 'react';
import { fruitItems } from './constants';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (next) => () => setValue(next);
  return [value, changeBy];
};

const initialItem = fruitItems[3];

const App = () => {
  const [value, setValue] = useState(initialItem);
  const [inputValue, setInputValue] = useState(initialItem.label);
  const [autoHighlight, toggleAutoHighlight] = useToggle(true);
  const [closeBehavior, changeCloseBehaviorTo] = useSelection('restore');
  const [isClearable, toggleIsClearable] = useToggle(true);
  const [matchWidth, toggleMatchWidth] = useToggle(false);
  const [selectOnFocus, toggleSelectOnFocus] = useToggle(true);
  const [disabled, toggleDisabled] = useToggle(false);
  const [error, toggleError] = useToggle(false);
  const [showEmptyPlaceholder, toggleShowEmptyPlaceholder] = useToggle(true);

  return (
    <Box>
      <Box mb="4x">
        <Text fontSize="md" lineHeight="md">
          💡 All <Code>Autocomplete</Code> props listed below default to <Code>false</Code>. Toggle them to explore different behaviors and UI states.
        </Text>
      </Box>
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Autocomplete props
        </Text>
      </Box>
      <FormGroup ml="6x">
        <Box mb="2x">
          <Code>{`closeBehavior="${closeBehavior}"`}</Code>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{ '> *:not(:first-of-type)': { marginLeft: -1 } }}
        >
          {['restore', 'clear', 'keep'].map((value) => (
            <Button
              key={value}
              selected={value === closeBehavior}
              onClick={changeCloseBehaviorTo(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <Box mt="2x">
          <Text color="text.secondary">
            Controls how the input behaves when the popup closes and the typed text differs from the last committed value.
          </Text>
          <List color="text.secondary" mt="1x">
            <ListItem><Code>restore</Code> — reverts to the last committed value (default)</ListItem>
            <ListItem><Code>clear</Code> — clears the input and fires <Code>onClearInput</Code>, useful for multi-select scenarios</ListItem>
            <ListItem><Code>keep</Code> — preserves the current typed text, useful when both free input and selection are supported</ListItem>
          </List>
        </Box>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={autoHighlight}
            onChange={() => toggleAutoHighlight()}
          >
            <Code>autoHighlight</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Highlight the first option whenever the filtered list changes or the popup (re)opens. Pressing <Code>Enter</Code> then commits the top match without arrowing first.
          </Text>
        </Box>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={isClearable}
            onChange={() => toggleIsClearable()}
          >
            <Code>isClearable</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Show a clear button while there is a value. The chevron is replaced by a close icon that resets the input.
          </Text>
        </Box>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={matchWidth}
            onChange={() => toggleMatchWidth()}
          >
            <Code>matchWidth</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Size the dropdown to match the input's width exactly, regardless of content width.
          </Text>
        </Box>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={selectOnFocus}
            onChange={() => toggleSelectOnFocus()}
          >
            <Code>selectOnFocus</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Select the existing input text on focus, letting the user immediately type to replace the previous value.
          </Text>
        </Box>
      </FormGroup>
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          AutocompleteInput props
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={disabled}
            onChange={() => toggleDisabled()}
          >
            <Code>disabled</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Disable the input and suppress all interactions. The native <Code>disabled</Code> attribute prevents events from reaching the state machine, so the popup never opens.
          </Text>
        </Box>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={error}
            onChange={() => toggleError()}
          >
            <Code>error</Code>
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            Show a red border to indicate an error state.
          </Text>
        </Box>
      </FormGroup>
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Autocomplete setup
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <Checkbox
            checked={showEmptyPlaceholder}
            onChange={() => toggleShowEmptyPlaceholder()}
          >
            Show empty placeholder
          </Checkbox>
        </Box>
        <Box ml="6x">
          <Text color="text.secondary">
            When the filtered list is empty, the popup shows a <Code>No items</Code> message. Turn this off to hide the popup entirely while there are no matches.
          </Text>
        </Box>
      </FormGroup>
      <Divider my="4x" />
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>inputValue:</Text>
          <Text>{JSON.stringify(inputValue)}</Text>
          <Text>value:</Text>
          <Text>{JSON.stringify(value)}</Text>
        </Grid>
      </Flex>
      <Autocomplete
        sx={{
          width: 400,
        }}
        autoHighlight={autoHighlight}
        closeBehavior={closeBehavior}
        defaultValue={initialItem}
        inputValue={inputValue}
        isClearable={isClearable}
        items={fruitItems}
        matchWidth={matchWidth}
        onChange={setValue}
        onInputChange={setInputValue}
        portalled
        renderInput={(params) => (
          <AutocompleteInput
            {...params}
            disabled={disabled}
            error={error}
            placeholder="Search fruits"
          />
        )}
        renderContent={({ items: filteredItems, renderItems }) => {
          if (filteredItems.length === 0) {
            return showEmptyPlaceholder
              ? (
                  <Box px="3x" py="2x">
                    No items
                  </Box>
                )
              : null;
          }
          return renderItems(filteredItems);
        }}
        renderItem={(item, { inputValue: query }) => (
          <Highlight variant="highlight" query={query}>
            {item.label}
          </Highlight>
        )}
        selectOnFocus={selectOnFocus}
      />
    </Box>
  );
};

export default App;

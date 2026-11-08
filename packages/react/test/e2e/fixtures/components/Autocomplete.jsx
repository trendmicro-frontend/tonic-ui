/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Autocomplete, AutocompleteInput, Box, Button } from '../../../../src';

const baseItems = ['Apple', 'Banana', 'Cherry'];

// An unbreakable label whose max-content width is far wider than both the
// fixture container and the 640px cap, so content-driven sizing is observable.
const wideItems = [
  ...baseItems,
  { value: 'wide', label: 'W'.repeat(160) },
];

// Enough rows to overflow the list's 40vh max height, so keyboard navigation
// has to scroll the highlighted option into view.
const manyItems = Array.from({ length: 40 }, (_, index) => `Item ${index + 1}`);

const AutocompleteFixture = ({ params, record }) => {
  const [value, setValue] = useState(null);
  const items = params.has('many')
    ? manyItems
    : params.has('wide')
      ? wideItems
      : baseItems;
  const width = params.get('width');

  return (
    <Box sx={width ? { width } : undefined}>
      <Autocomplete
        items={items}
        matchWidth={params.has('matchWidth')}
        value={value}
        onChange={(item) => {
          setValue(item);
          record({ type: 'change', value: item });
        }}
        onOpen={() => record({ type: 'open' })}
        onClose={() => record({ type: 'close' })}
        portalled={params.has('portalled')}
        renderInput={({ inputProps, isClearable, isLoading, onClearInput, ref }) => (
          <AutocompleteInput
            ref={ref}
            data-testid="input-control"
            isClearable={isClearable}
            isLoading={isLoading}
            onClearInput={onClearInput}
            inputProps={{ ...inputProps, 'data-testid': 'trigger' }}
          />
        )}
        renderContent={({ items: filteredItems, renderItems }) => (
          <>
            <Button data-testid="inside" sx={{ height: 48 }}>
              Autocomplete header
            </Button>
            {renderItems(filteredItems)}
          </>
        )}
        slotProps={{ content: { 'data-testid': 'content' } }}
      />
    </Box>
  );
};

export default AutocompleteFixture;

/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Autocomplete, AutocompleteInput } from '../../../src';

const items = ['Apple', 'Banana', 'Cherry'];

const AutocompleteFixture = ({ params, record }) => {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      items={items}
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
          isClearable={isClearable}
          isLoading={isLoading}
          onClearInput={onClearInput}
          inputProps={{ ...inputProps, 'data-testid': 'trigger' }}
        />
      )}
      renderContent={({ items: filteredItems, renderItems }) => (
        <>
          <button type="button" data-testid="inside" style={{ height: 48 }}>
            Autocomplete header
          </button>
          {renderItems(filteredItems)}
        </>
      )}
      slotProps={{ content: { 'data-testid': 'content' } }}
    />
  );
};

export default AutocompleteFixture;

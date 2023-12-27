import {
  SearchInput,
} from '@tonic-ui/react';
import {
  callEventHandlers,
} from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useState } from 'react';
import {
  useSearchBox,
} from 'react-instantsearch-core';

// https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook-params
const queryHook = (query, search) => {
  search(query);
};

const InstantSearchInput = forwardRef((
  {
    onChange: onChangeProp,
    ...rest
  },
  ref,
) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox({ queryHook });
  const [inputValue, setInputValue] = useState(query);

  const onChange = useCallback((event) => {
    const value = event.currentTarget.value;
    setInputValue(value);
    refine(value);
  }, [refine]);

  const onClearInput = useCallback(() => {
    setInputValue('');
    clear();
  }, [clear]);

  return (
    <SearchInput
      ref={ref}
      isLoading={isSearchStalled}
      value={inputValue}
      onChange={callEventHandlers(onChangeProp, onChange)}
      onClearInput={onClearInput}
      {...rest}
    />
  );
});

InstantSearchInput.displayName = 'InstantSearchInput';

export default InstantSearchInput;

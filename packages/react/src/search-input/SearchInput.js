import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../icon';
import { InputControl, InputAdornment } from '../input';
import { Spinner } from '../spinner';
import SearchInputCloseButton from './SearchInputCloseButton';

const SearchInput = React.forwardRef((
  {
    disabled,
    endAdornment: endAdornmentProp,
    isLoading,
    onChange: onChangeProp,
    onClearInput: onClearInputProp,
    readOnly,
    size,
    startAdornment: startAdornmentProp,
    ...rest
  },
  ref
) => {
  const inputRef = useRef();
  const combinedRef = useMergeRefs(inputRef, ref);
  const canClearInput = !disabled && !readOnly;
  const [isClearable, setIsClearable] = useState(canClearInput && !!(rest.value ?? rest.defaultValue));
  const inputValue = String(inputRef.current?.value ?? '');

  useEffect(() => {
    setIsClearable(canClearInput && inputValue.length > 0);
  }, [canClearInput, setIsClearable, inputValue]);

  const iconState = (() => {
    if (isLoading) {
      return 'loading';
    }
    if (isClearable) {
      return 'clearable';
    }
    return null;
  })();

  const onClearInput = useCallback((e) => {
    if (iconState !== 'clearable') {
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus(); // Retain focus on the input after clearing
    }

    setIsClearable(false);

    if (typeof onClearInputProp === 'function') {
      onClearInputProp(e);
    }
  }, [iconState, onClearInputProp]);

  const onChange = useCallback((e) => {
    const value = String(e.target.value ?? '');
    setIsClearable(value.length > 0);

    if (typeof onChangeProp === 'function') {
      onChangeProp(e);
    }
  }, [onChangeProp]);

  const startAdornment = (
    <InputAdornment>
      <Icon icon="search-o" />
    </InputAdornment>
  );

  const endAdornment = (
    <InputAdornment>
      {iconState === 'clearable' && (
        <SearchInputCloseButton
          disabled={disabled}
          onClick={onClearInput}
          size={size}
        >
          <Icon icon="close-s" />
        </SearchInputCloseButton>
      )}
      {iconState === 'loading' && (
        <Spinner size="xs" />
      )}
    </InputAdornment>
  );

  return (
    <InputControl
      inputRef={combinedRef}
      disabled={disabled}
      endAdornment={endAdornmentProp !== undefined ? endAdornmentProp : endAdornment}
      onChange={onChange}
      readOnly={readOnly}
      size={size}
      startAdornment={startAdornmentProp !== undefined ? startAdornmentProp : startAdornment}
      {...rest}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;

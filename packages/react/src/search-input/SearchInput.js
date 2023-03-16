import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ensureString } from 'ensure-type';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../icon';
import { InputControl, InputAdornment } from '../input';
import { Spinner } from '../spinner';
import SearchInputCloseButton from './SearchInputCloseButton';

const SearchInput = React.forwardRef((
  {
    defaultValue: defaultValueProp = '',
    disabled,
    endAdornment: endAdornmentProp,
    isLoading,
    onChange: onChangeProp,
    onClearInput: onClearInputProp,
    readOnly,
    size,
    startAdornment: startAdornmentProp,
    value: valueProp,
    ...rest
  },
  ref
) => {
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const [value, setValue] = useState(ensureString(valueProp ?? defaultValueProp));
  const isClearable = !disabled && !readOnly && !!value;

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      setValue(valueProp);
    }
  }, [valueProp]);

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

    const nextValue = '';
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextValue);
    }

    if (typeof onClearInputProp === 'function') {
      onClearInputProp(e);
    }

    requestAnimationFrame(() => {
      const el = nodeRef.current;
      el && el.focus(); // Retain focus on the input after clearing
    });
  }, [iconState, valueProp, onClearInputProp]);

  const onChange = useCallback((e) => {
    const nextValue = ensureString(e.target.value ?? '');
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(e);
    }
  }, [valueProp, onChangeProp]);

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
      value={value}
      {...rest}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;

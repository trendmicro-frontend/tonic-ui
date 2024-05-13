import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ensureString } from 'ensure-type';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputControl } from '../input';
import useRunAfterUpdate from '../utils/useRunAfterUpdate';
import SearchInputAdornment from './SearchInputAdornment';
import SearchInputClearButton from './SearchInputClearButton';
import SearchInputLoadingIcon from './SearchInputLoadingIcon';
import SearchInputSearchIcon from './SearchInputSearchIcon';

const defaultSize = 'md';
const defaultVariant = 'outline';

const SearchInput = React.forwardRef((
  {
    defaultValue: defaultValueProp = '',
    disabled,
    endAdornment: endAdornmentProp,
    isLoading,
    onChange: onChangeProp,
    onClearInput: onClearInputProp,
    readOnly,
    size = defaultSize,
    startAdornment: startAdornmentProp,
    value: valueProp,
    variant = defaultVariant,
    ...rest
  },
  ref
) => {
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const [value, setValue] = useState(ensureString(valueProp ?? defaultValueProp));
  const isClearable = !disabled && !readOnly && !!value;
  const inputSelectionRef = useRef();
  const runAfterUpdate = useRunAfterUpdate();

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      setValue(valueProp);
    }

    runAfterUpdate(() => {
      if (inputSelectionRef.current && nodeRef.current) {
        nodeRef.current.selectionStart = inputSelectionRef.current.start;
        nodeRef.current.selectionEnd = inputSelectionRef.current.end;
      }
    });
  }, [valueProp, runAfterUpdate]);

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
    // When the input value remains unchanged in controlled input, composition events (especially CJK input methods) may not work properly.
    // To address this issue, update the input value internally before invoking `onChangeProp`.
    const nextValue = ensureString(e.target.value ?? '');
    setValue(nextValue);

    inputSelectionRef.current = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    };

    if (typeof onChangeProp === 'function') {
      onChangeProp(e);
    }
  }, [onChangeProp]);

  const startAdornment = (
    <SearchInputAdornment>
      <SearchInputSearchIcon variant={variant} />
    </SearchInputAdornment>
  );

  const endAdornment = (() => {
    if (iconState === 'clearable') {
      return (
        <SearchInputAdornment>
          <SearchInputClearButton
            disabled={disabled}
            onClick={onClearInput}
            size={size}
            variant={variant}
          />
        </SearchInputAdornment>
      );
    }

    if (iconState === 'loading') {
      return (
        <SearchInputAdornment>
          <SearchInputLoadingIcon variant={variant} />
        </SearchInputAdornment>
      );
    }

    return null;
  })();

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
      variant={variant}
      {...rest}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;

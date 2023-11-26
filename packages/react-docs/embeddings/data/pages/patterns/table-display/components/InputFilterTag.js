import {
  Box,
  Button,
  Flex,
  Input,
  OverflowTooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import {
  callEventHandlers,
} from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import FilterTag from './FilterTag';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

const InputFilterTag = forwardRef((
  {
    label,
    value: valueProp = '',
    onChange: onChangeProp,
    onClose: onCloseProp,
    inputProps,
    ...rest
  },
  ref,
) => {
  const isApplyButtonClickedRef = useRef(false);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(valueProp ?? '');
  const [colorStyle] = useColorStyle();

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleClickApplyButton = useCallback(() => {
    ensureFunction(onChangeProp)(inputValue);

    isApplyButtonClickedRef.current = true;

    // Remove the focus from activeElement to close the popover
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }, [inputValue, onChangeProp]);

  useEffect(() => {
    // Ensure the input field is focused when it is displayed
    const timeoutId = setTimeout(() => {
      const el = inputRef.current;
      el && el.focus();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Popover
      arrow={false}
      defaultIsOpen={!valueProp}
      initialFocusRef={inputRef}
      offset={[0, 4]}
      onClose={() => {
        // Handle the case when the user never clicked the apply button
        if (!isApplyButtonClickedRef.current) {
          if (!valueProp) {
            // If the valueProp is empty, then we should close the popover
            ensureFunction(onCloseProp)();
          } else {
            // If the valueProp is not empty, then we should reset the input value
            setInputValue(valueProp);
          }
        }

        isApplyButtonClickedRef.current = false;
      }}
      returnFocusOnClose={false}
    >
      <PopoverTrigger
        shouldWrapChildren
      >
        <FilterTag
          onClose={(event) => {
            event.stopPropagation();
            ensureFunction(onCloseProp)();
          }}
        >
          <Flex columnGap="1x">
            <Text color={colorStyle.color.secondary}>
              {label}
            </Text>
            <OverflowTooltip label={valueProp}>
              {valueProp}
            </OverflowTooltip>
          </Flex>
        </FilterTag>
      </PopoverTrigger>
      <PopoverContent
        PopperProps={{
          usePortal: true,
        }}
      >
        <Box mb="2x">
          <Input
            {...inputProps}
            ref={inputRef}
            value={inputValue}
            onChange={callEventHandlers(inputProps.onChange, handleInputChange)}
          />
        </Box>
        <Box>
          <Button
            disabled={!inputValue}
            variant="primary"
            size="sm"
            onClick={handleClickApplyButton}
          >
            Apply
          </Button>
        </Box>
      </PopoverContent>
    </Popover>
  );
});

InputFilterTag.displayName = 'InputFilterTag';

export default InputFilterTag;

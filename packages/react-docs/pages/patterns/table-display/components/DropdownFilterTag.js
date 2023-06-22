import {
  Flex,
  OverflowTooltip,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { useMemo, useRef } from 'react';
import Dropdown from '@/components/Dropdown';
import FilterTag from './FilterTag';

const DropdownFilterTag = ({
  label,
  options: optionsProp,
  value: valueProp = null,
  onChange: onChangeProp,
  onClose: onCloseProp,
}) => {
  const [colorStyle] = useColorStyle();
  const hasChangedValueRef = useRef(false);
  const options = useMemo(() => {
    return optionsProp.map(option => option.value);
  }, [optionsProp]);
  const optionMap = useMemo(() => {
    return optionsProp.reduce((acc, option) => {
      acc[option.value] = option;
      return acc;
    }, {});
  }, [optionsProp]);

  return (
    <Dropdown
      defaultIsOpen={!valueProp}
      options={options}
      offset={[0, 4]}
      onChange={(value) => {
        // The onChange callback will only be triggered when an option is selected
        hasChangedValueRef.current = !!value;
        onChangeProp(value);
      }}
      onClose={() => {
        if (!valueProp && !hasChangedValueRef.current) {
          ensureFunction(onCloseProp)();
        }
        hasChangedValueRef.current = false;
      }}
      renderOption={(value) => optionMap[value]?.label}
      value={valueProp}
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
    </Dropdown>
  );
};

DropdownFilterTag.displayName = 'DropdownFilterTag';

export default DropdownFilterTag;

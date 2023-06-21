import {
  Flex,
  OverflowTooltip,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { useMemo } from 'react';
import Multiselect from '@/components/Multiselect';
import FilterTag from './FilterTag';

const MultiselectFilterTag = ({
  label,
  options: optionsProp,
  value: valueProp = null,
  onChange: onChangeProp,
  onClose: onCloseProp,
}) => {
  const [colorStyle] = useColorStyle();
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
    <Multiselect
      isSearchable
      defaultIsOpen={Array.isArray(valueProp) ? valueProp.length === 0 : !valueProp}
      options={options}
      offset={[0, 4]}
      onChange={(value) => {
        // The onChange callback will be triggered every time, regardless of whether an option was selected or not
        onChangeProp(value);

        if (value.length === 0) {
          ensureFunction(onCloseProp)();
        }
      }}
      renderOption={(value) => optionMap[value]?.label}
      shouldSelectAllIfNoneSelected={false}
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
            {Array.isArray(valueProp) ? valueProp.map(value => optionMap[value]?.label).join(', ') : optionMap[valueProp]}
          </OverflowTooltip>
        </Flex>
      </FilterTag>
    </Multiselect>
  );
};

MultiselectFilterTag.displayName = 'MultiselectFilterTag';

export default MultiselectFilterTag;

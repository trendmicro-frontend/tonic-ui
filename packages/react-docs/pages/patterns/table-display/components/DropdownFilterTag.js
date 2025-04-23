import {
  Flex,
  OverflowTooltip,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { useEffectOnce, useToggle } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { useMemo, useRef } from 'react';
import { Dropdown } from '@/experiments/dropdown';
import FilterTag from './FilterTag';

const DropdownFilterTag = ({
  label,
  onClose,
  onChange,
  options,
  value,
  ...rest
}) => {
  const isSelectedRef = useRef();
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffectOnce(() => {
    // Automatically open the menu on initial render
    toggleIsOpen(true);
  });

  const handleClose = () => {
    toggleIsOpen(false);
    if (!isSelectedRef.current) {
      ensureFunction(onClose)();
    }
  };

  const handleOpen = () => {
    toggleIsOpen(true);
  };

  const handleSelect = (option) => {
    const nextValue = option.value;
    if (nextValue !== value) {
      ensureFunction(onChange)(nextValue);
      isSelectedRef.current = true;
    }
  };

  const [colorStyle] = useColorStyle();
  const optionMap = useMemo(() => {
    return options.reduce((acc, option) => {
      acc[option.value] = option;
      return acc;
    }, {});
  }, [options]);

  return (
    <Dropdown
      isOpen={isOpen}
      offset={[0, 4]}
      onClose={handleClose}
      onOpen={handleOpen}
      onSelect={handleSelect}
      options={options}
      {...rest}
    >
      {({ getToggleProps }) => {
        return (
          <FilterTag
            {...getToggleProps()}
            onClose={onClose}
          >
            <Flex columnGap="1x">
              <Text color={colorStyle.color.secondary}>
                {label}
              </Text>
              <OverflowTooltip label={optionMap[value]?.label}>
                {optionMap[value]?.label}
              </OverflowTooltip>
            </Flex>
          </FilterTag>
        );
      }}
    </Dropdown>
  );
};

DropdownFilterTag.displayName = 'DropdownFilterTag';

export default DropdownFilterTag;

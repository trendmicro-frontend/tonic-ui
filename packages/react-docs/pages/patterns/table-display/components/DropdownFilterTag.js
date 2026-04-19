import {
  Flex,
} from '@tonic-ui/react';
import { useEffectOnce, useToggle } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import { forwardRef, useMemo, useRef } from 'react';
import { Dropdown } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';
import FilterTag from './FilterTag';

const DropdownFilterTag = forwardRef((
  {
    label,
    onClose,
    onChange,
    items = [],
    value,
    ...rest
  },
  ref,
) => {
  const itemMap = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.value] = item;
      return acc;
    }, {});
  }, [items]);
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

  const handleSelect = (item) => {
    const nextValue = item.value;
    if (nextValue !== value) {
      ensureFunction(onChange)(nextValue);
      isSelectedRef.current = true;
    }
  };

  const FilterTagToggle = useMemo(() => {
    const Component = forwardRef((props, ref) => (
      <FilterTag ref={ref} {...props} onClose={onClose} />
    ));
    Component.displayName = 'FilterTagToggle';
    return Component;
  }, [onClose]);

  return (
    <Dropdown
      isOpen={isOpen}
      offset={[0, 4]}
      onClose={handleClose}
      onOpen={handleOpen}
      onSelect={handleSelect}
      items={items}
      slots={{
        toggle: FilterTagToggle,
      }}
      {...rest}
    >
      <Flex alignItems="center" columnGap="1x">
        <FlexItem as={MutedText} fixed>
          {label}
        </FlexItem>
        <FlexItem tooltip>
          {itemMap[value]?.label}
        </FlexItem>
      </Flex>
    </Dropdown>
  );
});

DropdownFilterTag.displayName = 'DropdownFilterTag';

export default DropdownFilterTag;

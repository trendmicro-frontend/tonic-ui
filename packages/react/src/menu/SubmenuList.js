import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import SubmenuContent from './SubmenuContent';
import { useSubmenuListStyle } from './styles';
import useSubmenu from './useSubmenu';

const SubmenuList = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'SubmenuList' });
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    isOpen,
    placement,
  } = { ...submenuContext };
  const styleProps = useSubmenuListStyle({ isOpen, placement });

  return (
    <SubmenuContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

SubmenuList.displayName = 'SubmenuList';

export default SubmenuList;

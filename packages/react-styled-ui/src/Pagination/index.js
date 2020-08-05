import React from 'react';
import usePagination from '../usePagination';
import Button from '../Button';
import ButtonBase from '../ButtonBase';
import useColorMode from '../useColorMode';
import { setColorWithOpacity } from '../theme/colors';

const SelectableButton = ({ selected, ...props }) => {
  const { colorMode } = useColorMode();
  const activeColor = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  const activeBgColor = {
    dark: setColorWithOpacity('black', 0.12),
    light: setColorWithOpacity('black', 0.08),
  }[colorMode];
  const activeBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const getSelectedProps = {
    color: activeColor,
    borderColor: activeBorderColor,
    bg: activeBgColor,
  };
  return (
    <Button
      {...(selected && getSelectedProps)}
      {...props}
    />
  );
};

const Pagination = (props, ref) => {
  const {
    prevLabel = '<',
    nextLabel = '>',
    ellipsisLabel = '...',
  } = props;
  // const {
  //   boundaryCount,
  //   count,
  //   defaultPage,
  //   disabled,
  //   hideNextButton,
  //   hidePrevButton,
  //   onChange: handleChange,
  //   page: pageProp,
  //   showFirstButton,
  //   showLastButton,
  //   siblingCount,
  // } = props;
  const { items } = usePagination(props);
  return (
    <React.Fragment>
      {items.map((item, index) => {
        let label;
        if (item.type === 'previous') {
          label = prevLabel;
        } else if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
          return (
            <ButtonBase
              key={`${item.page}-${item.type}`}
              cursor="default"
              disabled={item.disabled}
              px={11}
            >
              {ellipsisLabel}
            </ButtonBase>
          );
        } else if (item.type === 'next') {
          label = nextLabel;
        } else {
          label = item.page;
        }
        return (
          <SelectableButton
            key={`${item.page}-${item.type}`}
            selected={item.selected}
            disabled={item.disabled}
            variant="ghost"
            onClick={item.onClick}
            transition="none"
          >
            {label}
          </SelectableButton>
        );
      })}
    </React.Fragment>
  );
};

export default Pagination;

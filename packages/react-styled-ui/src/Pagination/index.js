import React from 'react';
import usePagination from '../usePagination';
import Button from '../Button';
import ButtonBase from '../ButtonBase';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';
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
    ellipsisLabel = '...',
    firstButton = false,
    lastButton = false,
    prevButton = '<',
    nextButton = '>',
  } = props;
  const { items } = usePagination({
    ...props,
    hideNextButton: !nextButton,
    hidePrevButton: !prevButton,
    showFirstButton: !!firstButton,
    showLastButton: !!lastButton,
  });
  const { colorMode } = useColorMode();
  const { sizes } = useTheme();
  return (
    <React.Fragment>
      {items.map((item, index) => {
        let label;
        if (item.type === 'first') {
          label = firstButton;
        } else if (item.type === 'last') {
          label = lastButton;
        } else if (item.type === 'previous') {
          label = prevButton;
        } else if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
          const space = sizes['3x'];
          const ellipsisOpacity = {
            dark: 0.28,
            light: 0.3,
          }[colorMode];
          return (
            <ButtonBase
              key={`${item.page}-${item.type}`}
              cursor="default"
              disabled={item.disabled}
              _disabled={{
                opacity: ellipsisOpacity
              }}
              px={`calc(${space} - 1px)`}
            >
              {ellipsisLabel}
            </ButtonBase>
          );
        } else if (item.type === 'next') {
          label = nextButton;
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

Pagination.displayName = 'Pagination';

export default Pagination;

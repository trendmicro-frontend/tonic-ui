import React from 'react';
import usePagination from '../usePagination';
import Button from '../Button';
import ButtonBase from '../ButtonBase';
import { useColorMode } from '../ColorMode';
import useTheme from '../useTheme';
import { useSelectedButtonStyle } from './styles';

const Pagination = ({
  ellipsisLabel = '...',
  firstButton = false,
  lastButton = false,
  prevButton = '<',
  nextButton = '>',
  ...rest
}) => {
  const { items } = usePagination({
    ...rest,
    hideNextButton: !nextButton,
    hidePrevButton: !prevButton,
    showFirstButton: !!firstButton,
    showLastButton: !!lastButton,
  });
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const selectedButtonStyleProps = useSelectedButtonStyle();

  return (
    <>
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
          <Button
            aria-disabled={item.disabled}
            aria-selected={item.selected}
            disabled={item.disabled}
            key={`${item.page}-${item.type}`}
            onClick={item.onClick}
            transition="none"
            variant="ghost"
            {...(item.selected && selectedButtonStyleProps)}
          >
            {label}
          </Button>
        );
      })}
    </>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;

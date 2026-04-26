import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuToggle,
  Submenu,
  SubmenuTrigger,
  SubmenuList,
} from '@tonic-ui/react';
import { callEventHandlers, isPlainObject, runIfFn } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import { Fragment, forwardRef, useCallback } from 'react';
import { getMenuListStyle } from './styles';

const isValidElementType = (type) => {
  return (
    typeof type === 'string' || // Covers: 'div', 'span', etc.
    typeof type === 'function' || // Covers: function components and class components
    (typeof type === 'object' && type !== null && typeof type.$$typeof === 'symbol') // Covers: React.memo, React.forwardRef, React.lazy, etc.
  );
};

const defaultRenderItem = (item) => (isPlainObject(item) ? item.label : item);

const DropdownBase = forwardRef((
  {
    children,
    items = [],
    onSelect,
    portalled = false,
    renderContent = null,
    renderItem: renderItemProp = defaultRenderItem,
    slots = {},
    slotProps = {},
    ...rest
  },
  ref,
) => {
  const handleClickBy = useCallback((item) => (event) => {
    if (event.defaultPrevented) {
      return;
    }
    onSelect?.(item);
  }, [onSelect]);
  const handleKeyDownBy = useCallback((item) => (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
      onSelect?.(item);
    }
  }, [onSelect]);

  const renderItem = ensureFunction(renderItemProp);

  // Recursively render items including groups, dividers, and items
  const renderItems = useCallback((items) => {
    const _renderItems = (items, { prefix } = {}) => {
      return ensureArray(items).map((item, index) => {
        const key = [prefix, index].filter(x => (x !== null && x !== undefined)).join('_');

        if (!isPlainObject(item)) {
          return (
            <Fragment key={key}>
              {renderItem(item)}
            </Fragment>
          );
        }

        if (item.type === 'custom') {
          return (
            <Fragment key={key}>
              {renderItem(item)}
            </Fragment>
          );
        }

        if (item.type === 'group') {
          return (
            <MenuGroup key={`${key}_group`} title={item.label} {...item.props}>
              {_renderItems(item.children, { prefix: key })}
            </MenuGroup>
          );
        }

        if (item.type === 'divider') {
          return (
            <MenuDivider key={`${key}_divider`} {...item.props} />
          );
        }

        if (item.type === 'submenu') {
          return (
            <Submenu key={`${key}_submenu`}>
              <SubmenuTrigger
                width="100%"
                {...item.props}
              >
                {renderItem(item)}
              </SubmenuTrigger>
              <SubmenuList
                width="max-content"
              >
                {_renderItems(item.children, { prefix: key })}
              </SubmenuList>
            </Submenu>
          );
        }

        const { onClick: onClickProp, onKeyDown: onKeyDownProp, ...restItemProps } = { ...item.props };

        return (
          <MenuItem
            key={key}
            onClick={callEventHandlers(onClickProp, handleClickBy(item))}
            onKeyDown={callEventHandlers(onKeyDownProp, handleKeyDownBy(item))}
            {...restItemProps}
          >
            {renderItem(item)}
          </MenuItem>
        );
      });
    };

    return _renderItems(items);
  }, [renderItem, handleClickBy, handleKeyDownBy]);

  return (
    <Menu
      ref={ref}
      {...rest}
    >
      {({ menuToggleRef }) => {
        const toggleWidth = menuToggleRef?.current?.offsetWidth;
        const { width: contentWidth, ...contentProps } = { ...slotProps?.content };
        const menuListStyle = getMenuListStyle({ portalled, toggleWidth, contentWidth });

        return (
          <>
            <MenuToggle
              {...slotProps?.toggle}
            >
              {({ getMenuToggleProps: getToggleProps }) => {
                const Toggle = slots?.toggle;
                if (isValidElementType(Toggle)) {
                  return (
                    // The `Toggle` component must be wrapped with `forwardRef` to ensure correct positioning
                    <Toggle {...getToggleProps()}>
                      {children}
                    </Toggle>
                  );
                }
                return runIfFn(children, { getToggleProps });
              }}
            </MenuToggle>
            <MenuList
              {...menuListStyle}
              {...contentProps}
              PopperProps={{
                usePortal: portalled,
                ...contentProps?.PopperProps,
              }}
            >
              {(typeof renderContent === 'function')
                ? renderContent({ items, renderItem, renderItems })
                : renderItems(items)}
            </MenuList>
          </>
        );
      }}
    </Menu>
  );
});

DropdownBase.displayName = 'DropdownBase';

export default DropdownBase;

import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuToggle,
  Submenu,
  SubmenuToggle,
  SubmenuList,
} from '@tonic-ui/react';
import { isPlainObject, runIfFn } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { Fragment, forwardRef, useCallback } from 'react';

const isValidElementType = (type) => {
  return (
    typeof type === 'string' || // Covers: 'div', 'span', etc.
    typeof type === 'function' || // Covers: function components and class components
    (typeof type === 'object' && type !== null && typeof type.$$typeof === 'symbol') // Covers: React.memo, React.forwardRef, React.lazy, etc.
  );
};

const defaultRenderItem = (item, context) => isPlainObject(item) ? item.label : item;

const DropdownBase = forwardRef((
  {
    children,
    onSelect,
    items = [],
    renderContent = null,
    renderItem: renderItemProp = defaultRenderItem,
    slots = {},
    slotProps = {},
    ...rest
  },
  ref,
) => {
  const handleClickBy = useCallback((item) => (event) => {
    onSelect?.(item);
  }, [onSelect]);

  const renderItem = (item) => (typeof renderItemProp === 'function') ? renderItemProp(item) : null;

  // Recursively render items including groups, dividers, and items
  const renderItems = (items, prefix) => {
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
            {renderItems(item.children, key)}
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
            <SubmenuToggle
              sx={{
                width: '100%',
              }}
            >
              <MenuItem {...item.props}>
                {renderItem?.(item)}
              </MenuItem>
            </SubmenuToggle>
            <SubmenuList
              sx={{
                width: 'max-content',
              }}
            >
              {renderItems(item.children, key)}
            </SubmenuList>
          </Submenu>
        );
      }

      return (
        <MenuItem
          key={key}
          onClick={handleClickBy(item)}
          {...item.props}
        >
          {renderItem?.(item)}
        </MenuItem>
      );
    });
  };

  return (
    <Menu
      ref={ref}
      {...rest}
    >
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
        sx={{
          // Set the minimum width to fit the menu's content while occupying full width
          minWidth: 'max-content',
          width: '100%',
        }}
        {...slotProps?.content}
      >
        {(typeof renderContent === 'function')
          ? renderContent({ items, renderItem, renderItems })
          : renderItems(items)
        }
      </MenuList>
    </Menu>
  );
});

DropdownBase.displayName = 'DropdownBase';

export default DropdownBase;

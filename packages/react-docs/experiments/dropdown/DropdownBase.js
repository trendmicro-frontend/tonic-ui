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
import React, { forwardRef, useCallback } from 'react';

const defaultRenderOption = (option) => option?.label;

const DropdownBase = forwardRef((
  {
    children,
    onSelect,
    options = [],
    renderContent = null,
    renderOption = defaultRenderOption,
    toggleProps,
    ...rest
  },
  ref,
) => {
  const handleClickBy = useCallback((option) => (event) => {
    onSelect?.(option);
  }, [onSelect]);

  // Recursively render options including groups, dividers, and items
  const renderOptions = (options, prefix = '') => {
    return ensureArray(options).map((option, index) => {
      const childPrefix = [prefix, index].join('_');

      if (!isPlainObject(option)) {
        return null;
      }

      if (option.type === 'group') {
        const key = `${childPrefix}_menugroup`;
        return (
          <MenuGroup key={key} title={option.label} {...option.props}>
            {renderOptions(option.children, childPrefix)}
          </MenuGroup>
        );
      }

      if (option.type === 'divider') {
        const key = `${childPrefix}_menudivider`;
        return (
          <MenuDivider key={key} {...option.props} />
        );
      }

      if (option.type === 'submenu') {
        const key = `${childPrefix}_submenu`;
        return (
          <Submenu key={key}>
            <SubmenuToggle
              sx={{
                width: '100%',
              }}
            >
              <MenuItem {...option.props}>
                {renderOption?.(option)}
              </MenuItem>
            </SubmenuToggle>
            <SubmenuList
              PopperProps={{
                usePortal: true,
              }}
              sx={{
                width: 'max-content',
              }}
            >
              {renderOptions(option.children, childPrefix)}
            </SubmenuList>
          </Submenu>
        );
      }

      const key = `${childPrefix}_menuitem`;
      return (
        <MenuItem
          key={key}
          onClick={handleClickBy(option)}
          {...option.props}
        >
          {renderOption?.(option)}
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
        {...toggleProps}
      >
        {({ getMenuToggleProps: getToggleProps }) => {
          return runIfFn(children, { getToggleProps });
        }}
      </MenuToggle>
      <MenuList
        sx={{
          // Set the minimum width to fit the menu's content while occupying full width
          minWidth: 'max-content',
          width: '100%',
        }}
      >
        {(typeof renderContent === 'function')
          ? renderContent({ options, renderOption, renderOptions })
          : renderOptions(options)
        }
      </MenuList>
    </Menu>
  );
});

DropdownBase.displayName = 'DropdownBase';

export default DropdownBase;

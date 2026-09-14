import { callEventHandlers, isPlainObject } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { Fragment, forwardRef, useCallback, useState } from 'react';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Submenu,
  SubmenuList,
  SubmenuTrigger,
} from '../menu';
import DropdownToggle from './DropdownToggle';
import { getDropdownContentStyle } from './styles';

const defaultRenderItem = (item) => isPlainObject(item) ? item.label : item;

const defaultRenderToggle = ({ renderItem, value }) => (
  <DropdownToggle>
    {renderItem(value)}
  </DropdownToggle>
);

/**
 * A dropdown item is an object that can include these fields:
 * - `label` — The content to display for the item.
 * - `type` — One of `'group' | 'divider' | 'submenu' | 'custom'`; omit for a regular menu item.
 * - `children` — Child items for `group` and `submenu` types.
 * - `props` — Props forwarded to the underlying components.
 * - Additional fields, such as `id` or `value`, are preserved and included in the item passed to `onChange`.
 *
 * @typedef {Object} DropdownProps
 * @property {any} [defaultValue] - The initial selected item for uncontrolled mode.
 * @property {any[]} [items] - The items to render in the dropdown.
 * @property {boolean} [matchWidth=false] - If `true`, sizes the content to match the toggle's width.
 * @property {(item: any) => void} [onChange] - Called with the selected item whenever the selection changes.
 * @property {boolean} [portalled=false] - If `true`, renders the dropdown in a portal.
 * @property {(args: { items: any[], renderItem: (item: any) => React.ReactNode, renderItems: (items: any[]) => React.ReactNode }) => React.ReactNode} [renderContent] - Customizes the content rendered inside the dropdown, such as headers, search inputs, or footers.
 * @property {(item: any) => React.ReactNode} [renderItem] - Customizes each item's content. The default returns `item.label` for plain objects and otherwise returns `item`. Custom implementations must accept `null` because the default toggle calls them before selection.
 * @property {(args: { renderItem: (item: any) => React.ReactNode, value: any }) => React.ReactNode} [renderToggle] - Renders the toggle. Defaults to an unstyled `DropdownToggle`.
 * @property {{ root?: object, content?: object }} [slotProps] - Props for the root and content slots.
 * @property {{ root?: React.ElementType }} [slots] - Slot components. `slots.root` replaces the internal `Menu` engine.
 * @property {any} [value] - The selected item for controlled mode. Pair with `onChange`.
 */

/**
 * @type {ForwardRefComponent<'div', DropdownProps>}
 */
const Dropdown = forwardRef((inProps, ref) => {
  const {
    defaultValue,
    items = [],
    matchWidth = false,
    onChange,
    portalled = false,
    renderContent,
    renderItem: renderItemProp = defaultRenderItem,
    renderToggle: renderToggleProp,
    slots = {},
    slotProps = {},
    value: valueProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Dropdown' });

  // `slots.root` swaps the internal `Menu` engine; `slotProps.content`
  // is applied to the internal menu content. Any other keys are silently swallowed.
  const { width: contentWidth, ...contentProps } = slotProps?.content ?? {};

  // The root slot wraps the internal `Menu` engine — Dropdown's outermost
  // component. Component-managed props (`ref`, `matchWidth`, `portalled`, rest)
  // go in `props`; `slotProps.root` merges over them.
  const [RootSlot, rootSlotProps] = useSlot({
    name: 'root',
    ownerName: Dropdown.displayName,
    props: {
      ref,
      matchWidth,
      portalled,
      ...rest,
    },
    slot: slots?.root ?? Menu,
    slotProps: slotProps?.root,
  });

  // The dropdown content sizing (`getDropdownContentStyle`) needs `toggleWidth`
  //   from the committed toggle element, which only exists inside the `Menu`
  //   render-prop below — it is spread onto `<ContentSlot>` there, under the
  //   user's `slotProps.content`.
  const [ContentSlot, contentSlotProps] = useSlot({
    name: 'content',
    ownerName: Dropdown.displayName,
    slot: MenuList,
    slotProps: contentProps,
  });

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const value = isControlled ? valueProp : internalValue;

  const handleChange = useCallback((item) => {
    if (!isControlled) {
      setInternalValue(item);
    }
    onChange?.(item);
  }, [isControlled, onChange]);

  // Selection is wired on BOTH `onClick` and `onKeyDown` — they look redundant
  // but each covers the path the other cannot see: `MenuItem` renders a real
  // `<button>` whose Enter/Space activation is the keydown's default action,
  // and `MenuItem`'s internal `useButtonEventHandlers` handler runs after these
  // (via `callEventHandlers`) and calls `preventDefault()`, cancelling the
  // browser's synthetic click. Keyboard activation therefore only reaches
  // `onKeyDown`, and mouse clicks only reach `onClick`; the `defaultPrevented`
  // guards skip events an upstream handler has already handled or vetoed. The
  // no-double-fire guarantee is the cancelled synthetic click — not the menu
  // closing — so it holds even with `closeOnSelect={false}` (menu stays open,
  // item stays mounted).
  const handleClickBy = useCallback((item) => (event) => {
    if (event.defaultPrevented) {
      return;
    }
    handleChange(item);
  }, [handleChange]);
  const handleKeyDownBy = useCallback((item) => (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
      handleChange(item);
    }
  }, [handleChange]);

  const renderItem = ensureFunction(renderItemProp);

  // Recursively render items including groups, dividers, and items
  const renderItems = useCallback((itemsToRender) => {
    const _renderItems = (list, { prefix } = {}) => {
      return ensureArray(list).map((item, index) => {
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
            <Submenu key={`${key}_submenu`} portalled>
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

    return _renderItems(itemsToRender);
  }, [renderItem, handleClickBy, handleKeyDownBy]);

  const renderToggle = (typeof renderToggleProp === 'function')
    ? renderToggleProp
    : defaultRenderToggle;

  return (
    <RootSlot {...rootSlotProps}>
      {({ menuToggleRef }) => {
        const toggleWidth = menuToggleRef?.current?.offsetWidth;
        const contentStyle = getDropdownContentStyle({ matchWidth, portalled, toggleWidth, contentWidth });

        return (
          <>
            {renderToggle({ renderItem, value })}
            <ContentSlot
              {...contentStyle}
              {...contentSlotProps}
            >
              {(typeof renderContent === 'function')
                ? renderContent({ items, renderItem, renderItems })
                : renderItems(items)}
            </ContentSlot>
          </>
        );
      }}
    </RootSlot>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;

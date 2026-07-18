import React, { createRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '@tonic-ui/react';

// === Menu ===
<Menu>
  <MenuButton>Open Menu</MenuButton>
  <MenuList>
    <MenuItem>Item 1</MenuItem>
    <MenuItem>Item 2</MenuItem>
  </MenuList>
</Menu>;

// With isOpen (controlled)
<Menu isOpen onClose={() => console.log('close')}>
  <MenuButton>Open</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With onOpen callback
<Menu onOpen={() => console.log('opened')}>
  <MenuButton>onOpen</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With placement
<Menu placement="top">
  <MenuButton>top</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu placement="top-start">
  <MenuButton>top-start</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu placement="top-end">
  <MenuButton>top-end</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu placement="bottom">
  <MenuButton>bottom</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu placement="bottom-start">
  <MenuButton>bottom-start</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu placement="bottom-end">
  <MenuButton>bottom-end</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With offset as array tuple
<Menu offset={[0, 8]}>
  <MenuButton>Menu</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With custom placement and offset
<Menu placement="top-end" offset={[10, 12]}>
  <MenuButton>Menu</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With autoSelect prop
<Menu autoSelect>
  <MenuButton>autoSelect</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu autoSelect={false}>
  <MenuButton>autoSelect false</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With closeOnBlur prop
<Menu closeOnBlur>
  <MenuButton>closeOnBlur</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu closeOnBlur={false}>
  <MenuButton>closeOnBlur false</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With closeOnSelect prop
<Menu closeOnSelect>
  <MenuButton>closeOnSelect</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu closeOnSelect={false}>
  <MenuButton>closeOnSelect false</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With defaultActiveIndex prop
<Menu defaultActiveIndex={0}>
  <MenuButton>defaultActiveIndex 0</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu defaultActiveIndex={-1}>
  <MenuButton>defaultActiveIndex -1</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With defaultIsOpen prop
<Menu defaultIsOpen>
  <MenuButton>defaultIsOpen</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu defaultIsOpen={false}>
  <MenuButton>defaultIsOpen false</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With returnFocusOnClose prop
<Menu returnFocusOnClose>
  <MenuButton>returnFocusOnClose</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

<Menu returnFocusOnClose={false}>
  <MenuButton>returnFocusOnClose false</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With anchorEl prop
const anchorElElement = document.getElementById('anchor');
<Menu anchorEl={anchorElElement}>
  <MenuButton>Menu with anchorEl</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With explicit null
<Menu anchorEl={null}>
  <MenuButton>Menu with null anchorEl</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With direct HTMLElement
const createdElement = document.createElement('div');
<Menu anchorEl={createdElement}>
  <MenuButton>Menu with created element</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With ref.current pattern
const elementRef = createRef<HTMLElement>();
<Menu anchorEl={elementRef.current}>
  <MenuButton>Menu with ref.current</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// With render prop (children as function)
<Menu>
  {(context) => (
    <>
      <MenuButton>Open Menu</MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </MenuList>
    </>
  )}
</Menu>;

// Ref
const menuRef = createRef<HTMLDivElement>();
<Menu ref={menuRef}>
  <MenuButton>Menu</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Menu
<Menu ref={wrongRef}>
  <MenuButton>Menu</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// === Negative tests ===
// @ts-expect-error - 'center' is not a valid placement
<Menu placement="center">
  <MenuButton>Invalid placement</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// @ts-expect-error - string is not assignable to HTMLElement | null
<Menu anchorEl="invalid">
  <MenuButton>Invalid</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

// @ts-expect-error - number is not assignable to HTMLElement | null
<Menu anchorEl={123}>
  <MenuButton>Invalid</MenuButton>
  <MenuList>
    <MenuItem>Item</MenuItem>
  </MenuList>
</Menu>;

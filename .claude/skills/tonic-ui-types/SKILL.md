---
name: tonic-ui-types
description: Use this skill when adding JSDoc type definitions to React components in Tonic UI. Triggers include "add type definitions", "add JSDoc types", "document component props", or when creating new components that need type annotations.
---

# Add Type Definitions to React Components

This skill provides guidelines for adding JSDoc type definitions to React components in the Tonic UI design system.

## Overview

Tonic UI uses JSDoc annotations (`@typedef` and `@type`) to provide type information for React components. This enables better IDE support, documentation generation, and type checking.

## Prerequisites

Before adding type definitions:

1. **Read the component documentation** (required) - Check `packages/react-docs/pages/components/[component-name]/index.page.mdx`
   - Locate the Props table in the `## Props` section
   - Document all prop names, types, defaults, and descriptions
   - Use exact descriptions from the documentation
   - If no documentation exists, analyze the component implementation
2. **Read the component file** to understand its implementation
3. **Verify the component pattern** (forwardRef vs functional component)
4. **Identify the HTML element type** that the component renders

## Required Workflow

### Step 1: Identify the Component Pattern

Determine which pattern the component uses:

**ForwardRef Component (most common):**
```javascript
const Component = forwardRef((inProps, ref) => { ... });
```

**Functional Component (no ref):**
```javascript
const Component = (inProps) => { ... };
```

### Step 2: Add the @typedef Block

Add a JSDoc `@typedef` block before the component declaration. Include all custom props with their types and descriptions.

**Format:**
```javascript
/**
 * @typedef {Object} ComponentNameProps
 * @property {type} [propName] - Description of the property.
 * @property {type} [propName=default] - Description with default value.
 */
```

**Property Type Examples:**
- `{React.ReactNode}` - React children or renderable content
- `{boolean}` - Boolean flags
- `{string}` - String values
- `{number}` - Numeric values
- `{function}` - Callback functions
- `{'option1' | 'option2'}` - String enums
- `{'sm' | 'md' | 'lg'}` - Size variants
- `{React.ReactNode | React.ReactNode[]}` - Single or array
- `{React.RefObject<HTMLElement>}` - Ref objects

### Step 3: Add the @type Annotation

Add a `@type` annotation immediately before the component declaration.

**For ForwardRef Components (simple — no prop conflicts):**
```javascript
/**
 * @type {React.ForwardRefExoticComponent<StyleProps & React.ComponentPropsWithoutRef<'element'> & ComponentNameProps & React.RefAttributes<HTMLElement>>}
 */
const Component = forwardRef((inProps, ref) => {
```

**For ForwardRef Components (with prop conflicts — use `Omit`):**

When the component defines custom props that conflict with native HTML element props (e.g., `onChange`, `onBlur`, `children`, `size`), use `Omit<>` to exclude the conflicting native props:

```javascript
/**
 * @type {React.ForwardRefExoticComponent<StyleProps & Omit<React.ComponentPropsWithoutRef<'element'>, 'conflictingProp1' | 'conflictingProp2'> & ComponentNameProps & React.RefAttributes<HTMLElement>>}
 */
const Component = forwardRef((inProps, ref) => {
```

Common conflicts to `Omit`:
| Custom prop | Conflicts with native | Example components |
|-------------|----------------------|-------------------|
| `children` (render prop) | `React.ReactNode` children | Accordion, Modal |
| `onChange` (custom signature) | `HTMLElement.onChange` | Checkbox, Switch, Tabs |
| `onBlur`, `onFocus`, `onClick` | Native event handlers | Checkbox, Switch |
| `size` (string enum) | `HTMLInputElement.size` (number) | Input |

**For Functional Components:**
```javascript
/**
 * @type {React.FC<StyleProps & ComponentNameProps>}
 */
const Component = (inProps) => {
```

### Step 4: Choose the Correct HTML Element

Match the element type to what the component renders:

| Component renders | Use element | Ref type |
|-------------------|-------------|----------|
| `<button>` | `'button'` | `HTMLButtonElement` |
| `<input>` | `'input'` | `HTMLInputElement` |
| `<a>` | `'a'` | `HTMLAnchorElement` |
| `<label>` | `'label'` | `HTMLLabelElement` |
| `<div>` (default) | `'div'` | `HTMLDivElement` |
| `<span>` | `'span'` | `HTMLSpanElement` |

### Step 4.5: Add Type Test File

Create a type test file at `packages/react/__type-tests__/components/{component-name}.test-d.tsx` to verify the type definitions compile correctly.

**Format:**
```tsx
import React, { createRef } from 'react';
import { ComponentName } from '@tonic-ui/react';

// Basic usage
<ComponentName>content</ComponentName>;

// With custom props
<ComponentName propName="value" />;

// With ref
const ref = createRef<HTMLDivElement>();
<ComponentName ref={ref} />;

// With style props
<ComponentName mt={2} px="4x" />;
```

The type tests are compiled with `tsconfig.json` in the `__type-tests__/` directory using `strict: true` and `noEmit: true` — they only need to compile without errors.

## Implementation Rules

1. **Copy descriptions exactly** - Use the exact wording from the Props table in the documentation
2. **Always include `StyleProps`** - All Tonic UI components support style props
3. **Use brackets for optional props** - `[propName]` indicates optional
4. **Document defaults** - Use `[propName=default]` syntax
5. **Match documentation exactly** - Props, types, defaults, and descriptions must match the docs table
6. **Use proper React types** - `React.ReactNode`, `React.RefObject`, etc.
7. **Check for prop conflicts** - If a custom prop name collides with a native HTML prop, use `Omit<>` in the `@type` annotation
8. **Align with `useDefaultProps`** - Verify that default values in `@typedef` match the defaults provided by `useDefaultProps`

## Examples

### Example 1: Simple Component with Few Props

```javascript
/**
 * @typedef {Object} LinkProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled] - The link will be disabled.
 * @property {function} [onClick] - A callback called when the link is clicked.
 * @property {string} [variant='default'] - The visual style of the link.
 */

/**
 * @type {React.ForwardRefExoticComponent<StyleProps & React.ComponentPropsWithoutRef<'a'> & LinkProps & React.RefAttributes<HTMLAnchorElement>>}
 */
const Link = forwardRef((inProps, ref) => {
```

### Example 2: Component with Enum Props

```javascript
/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled] - Disables the button.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the button.
 * @property {'emphasis' | 'primary' | 'default' | 'secondary' | 'ghost'} [variant='default'] - The variant style.
 */

/**
 * @type {React.ForwardRefExoticComponent<StyleProps & React.ComponentPropsWithoutRef<'button'> & ButtonProps & React.RefAttributes<HTMLButtonElement>>}
 */
const Button = forwardRef((inProps, ref) => {
```

### Example 3: Component with Prop Conflicts (Omit pattern)

```javascript
/**
 * @typedef {Object} CheckboxProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [checked] - If `true`, the checkbox is checked.
 * @property {boolean} [disabled] - If `true`, the checkbox is disabled.
 * @property {function} [onChange] - A callback called when the state is changed.
 */

/**
 * @type {React.ForwardRefExoticComponent<StyleProps & Omit<React.ComponentPropsWithoutRef<'label'>, 'onBlur' | 'onChange' | 'onClick' | 'onFocus'> & CheckboxProps & React.RefAttributes<HTMLLabelElement>>}
 */
const Checkbox = forwardRef((inProps, ref) => {
```

### Example 4: Component with Complex Props

```javascript
/**
 * @typedef {Object} ModalProps
 * @property {React.ReactNode | ((context: object) => React.ReactNode)} [children] -
 * @property {boolean} [isOpen=false] - Controls the visibility of the modal.
 * @property {function} [onClose] - Callback when the modal closes.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - Element to focus on open.
 * @property {'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'} [size='auto'] - The size of the modal.
 */

/**
 * @type {React.ForwardRefExoticComponent<StyleProps & React.ComponentPropsWithoutRef<'div'> & ModalProps & React.RefAttributes<HTMLDivElement>>}
 */
const Modal = forwardRef((inProps, ref) => {
```

## Reference Files

Well-documented components to use as reference:
- `packages/react/src/link/Link.js` - Simple component, no `Omit` needed
- `packages/react/src/button/Button.js` - Basic component with size/variant
- `packages/react/src/input/Input.js` - Uses `Omit<..., 'size'>` for prop conflict
- `packages/react/src/checkbox/Checkbox.js` - Uses `Omit<..., 'onBlur' | 'onChange' | 'onClick' | 'onFocus'>`
- `packages/react/src/accordion/Accordion.js` - Uses `Omit<..., 'children'>` for render prop
- `packages/react/src/tabs/Tabs.js` - Uses `Omit<..., 'onChange'>` for custom handler

## Best Practices

1. **Follow existing patterns** - Match the style of nearby components
2. **Test in IDE** - Verify that autocomplete works after adding types
3. **Keep in sync** - Update types when props change
4. **Document all public props** - Even if the description is just `-`

## Common Issues and Solutions

**Issue:** IDE doesn't recognize custom props
**Solution:** Ensure the `@typedef` is directly above the `@type` annotation

**Issue:** Native HTML props not showing
**Solution:** Add `React.ComponentPropsWithoutRef<'element'>` to the type union

**Issue:** Ref type mismatch
**Solution:** Match `React.RefAttributes<HTMLElement>` to the actual DOM element type

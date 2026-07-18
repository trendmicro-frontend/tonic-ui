---
name: tonic-ui-types
description: Use this skill when adding JSDoc type definitions to React components in Tonic UI. Triggers include "add type definitions", "add JSDoc types", "document component props", or when creating new components that need type annotations.
---

# Add Type Definitions to React Components

This skill provides guidelines for adding JSDoc type definitions to React components in the Tonic UI design system.

## Overview

Tonic UI uses JSDoc annotations (`@typedef` and `@type`) with global utility types to provide type information for React components. This enables better IDE support, documentation generation, and type checking.

## Prerequisites

Before adding type definitions:

1. **Read the component file** to understand its implementation — props, defaults, rendering logic.
2. **Identify the component pattern** — `forwardRef((inProps, ref) => ...)` or plain `(inProps) => ...`.
3. **Check if rest props are spread onto a native element** (e.g. `<Box as="button" {...rest} />`) — if so, identify which HTML element type it renders (e.g. `'div'`, `'button'`). This determines the first type parameter of `ForwardRefComponent`.
4. **Read the component documentation** — Check `packages/react-docs/pages/components/[component-name]/index.page.mdx`
   - Locate the Props table in the `## Props` section
   - Document all prop names, types, defaults, and descriptions
   - Use exact descriptions from the documentation
   - If no documentation exists, analyze the component implementation
   - If docs contradict the implementation, trust the implementation.

## Utility Types

Two global utility types are defined in `packages/react/global.d.ts`. Always use these instead of writing verbose inline types.

| Utility Type | Use When | Example |
|---|---|---|
| `ForwardRefComponent<E, P, R?>` | `forwardRef` component | `ForwardRefComponent<'button', ButtonProps>` |
| `StyledFC<P>` | Functional component (no ref forwarding) with `StyleProps` | `StyledFC<TooltipProps>` |

- `E` — Intrinsic element type string (e.g. `'div'`, `'button'`, `'svg'`).
- `P` — Custom component props typedef.
- `R` — Ref element type. Defaults to `HTMLElement`. Only specify when different (e.g. `SVGSVGElement`).

### Decision Tree

```
Is it a forwardRef component?
├─ Yes → ForwardRefComponent<'element', Props>
└─ No  → Does it accept StyleProps?
         ├─ Yes → StyledFC<Props>
         └─ No  → React.FC<Props>  (plain React type, no utility needed)
```

## Workflow

### Step 1: Add the `@typedef` Block

Add a JSDoc `@typedef` block before the component declaration. Include all custom props with their types and descriptions.

```javascript
/**
 * @typedef {Object} ComponentNameProps
 * @property {type} [propName] - Description of the property.
 * @property {type} [propName=default] - Description with default value.
 */
```

**Property type reference:**

- `{React.ReactNode}` - React children or renderable content
- `{boolean}` - Boolean flags
- `{string}` - String values
- `{number}` - Numeric values
- `{(event: React.MouseEvent<HTMLButtonElement>) => void}` - Callback with typed signature
- `{'option1' | 'option2'}` - String enums
- `{'sm' | 'md' | 'lg'}` - Size variants
- `{React.ReactNode | React.ReactNode[]}` - Single or array
- `{React.RefObject<HTMLElement>}` - Ref objects

**Forbidden types** — never use these; always spell out the full shape:

- `{any}`, `{unknown}`, `{function}`, `{Object}`, `{object}`
- `{Record<string, unknown>}`, `{{ [key: string]: unknown }}`

### Step 2: Add the `@type` Annotation

Add a `@type` annotation immediately before the component declaration using the appropriate utility type.

**`ForwardRefComponent`** — `forwardRef` + rest props spread onto a native element. The element type (`'button'` below) determines which native HTML props the user can pass:

```javascript
/**
 * @type {ForwardRefComponent<'button', ButtonProps>}
 */
const Button = forwardRef((inProps, ref) => {
  const { disabled, selected, size, variant, ...rest } = useDefaultProps({ props: inProps, name: 'Button' });
  // ...
  return (
    <ButtonBase
      ref={ref}
      as="button"        // ← renders a <button> → element type is 'button'
      {...rest}           // ← rest props spread onto native element → ForwardRefComponent
    />
  );
});
```

**`StyledFC`** — no `forwardRef`, no ref parameter:

```javascript
/**
 * @type {StyledFC<TooltipProps>}
 */
const Tooltip = (inProps) => {  // ← plain function, no ref → StyledFC
  const { children, label, placement, ...rest } = useDefaultProps({ props: inProps, name: 'Tooltip' });
  // ...
  return (
    <TooltipContext.Provider value={context}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent {...rest}>{label}</TooltipContent>
    </TooltipContext.Provider>
  );
};
```

If neither utility type fits (e.g. generic type parameters), define the type inline. See `src/tabs/Tabs.js` for an example.

### Step 3: Add Type Test File

Create `packages/react/__type-tests__/components/{component-name}.test-d.tsx`:

```tsx
import React, { createRef } from "react";
import { ComponentName } from "@tonic-ui/react";

// Basic usage
<ComponentName>content</ComponentName>;

// With custom props
<ComponentName propName="value" />;

// With ref
const ref = createRef<HTMLElement>();
<ComponentName ref={ref} />;

// With style props
<ComponentName mt={2} px="4x" />;
```

The type tests are compiled with `tsconfig.json` in the `__type-tests__/` directory using `strict: true` and `noEmit: true` — they only need to compile without errors.

**Type test rules:**

1. **Never manually specify types** — all types must be inferred from JSDoc. This verifies JSDoc correctness.
2. **Exception: `createRef<T>()`** — ref type parameters are needed to test ref assignability.
3. **Use `@ts-expect-error` for negative tests** — verify invalid values produce type errors.

## Implementation Rules

1. **Implementation is the source of truth** — trust the code over docs when they disagree.
2. **Use brackets for optional props** — `[propName]` indicates optional.
3. **Document defaults** — `[propName=default]` syntax.
4. **Align with `useDefaultProps`** — verify defaults match.
5. **Callback signatures must be typed** — e.g. `{React.ChangeEventHandler<HTMLInputElement>}`, never `{function}`.
6. **Hook return types must be typed** — define a `@typedef` for the return shape.

## Validation

After modifying JSDoc type definitions:

1. **Build**: `yarn build` (generates `.d.ts` from JSDoc)
2. **Type-check**: `yarn test:types` (validates against `.test-d.tsx` files)

## Reference Files

Well-typed components to use as reference:

- `src/link/Link.js` — `ForwardRefComponent<'a', LinkProps>`
- `src/button/Button.js` — `ForwardRefComponent<'button', ButtonProps>`
- `src/checkbox/Checkbox.js` — `ForwardRefComponent<'label', CheckboxProps>` (has prop conflicts, handled automatically)
- `src/accordion/AccordionBody.js` — `ForwardRefComponent<'div', AccordionBodyProps>` (wrapper component)
- `src/tooltip/Tooltip.js` — `StyledFC<TooltipProps>` (no ref forwarding)
- `src/icon/Icon.js` — `ForwardRefComponent<'svg', IconProps, SVGSVGElement>` (custom ref type)
- `src/tabs/Tabs.js` — Generic component (inline type, not using utility)
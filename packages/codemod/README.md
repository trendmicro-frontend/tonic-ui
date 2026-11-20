# @tonic-ui/codemod

A set of codemod scripts designed to simplify the migration and updating of Tonic UI applications.

## Usage

To view help information, run:

```bash
npx @tonic-ui/codemod@latest --help
```

To run a codemod with the latest version of `@tonic-ui/codemod`, use the following command:

```bash
npx @tonic-ui/codemod@latest <codemod> <path>
```

Make sure to replace `<codemod>` with the specific codemod you want to run and `<path>` with the path to the codebase you want to transform.

### Verbose mode

To enable verbose mode and see detailed output:

```bash
npx @tonic-ui/codemod@latest <codemod> <path> --verbose=2
```

### File extensions

For JavaScript files:

```bash
npx @tonic-ui/codemod@latest <codemod> <path> --extensions=js,jsx
```

For TypeScript files:

```bash
npx @tonic-ui/codemod@latest <codemod> <path> --parser=tsx --extensions=ts,tsx
```

### `jscodeshift` options

Options can be passed directly to `jscodeshift` using the `--jscodeshift` flag:

```bash
npx @tonic-ui/codemod@latest <codemod> <path> --jscodeshift='--cpus=2'
```

For additional options with `jscodeshift`, refer to the complete [jscodeshift CLI usage guide](https://github.com/facebook/jscodeshift?tab=readme-ov-file#usage-cli).

## Transforms

### `style-props-to-sx`

Converts flat style props and pseudo props (e.g. `width="8x"`, `_hover={{ ... }}`) on `@tonic-ui/react` and `@tonic-ui/react-icons` components into the `sx` prop, including on layout primitives such as `Box`. It leaves component-specific props with behavior beyond CSS in place (e.g. `Scrollbar`'s `width`/`height`/`overflow` or `Toast`'s `appearance`). It does not merge into an existing `sx` unless that value is a plain object literal.

A flat prop such as `width={{ _: '100%', lg: '50%' }}` uses breakpoint names. Moving that object into `sx.width` would turn the breakpoint names into nested CSS rules. The transform keeps the flat prop and reports it for manual review. It also keeps expressions whose value could be a breakpoint map, such as `width={props.width}`, and legacy responsive array literals or conditional expressions containing them. Replace arrays with breakpoint objects on flat props, or use explicit breakpoint media keys in `sx`. Arrays used to compose `sx` or `__sx` are unaffected.

Deprecated `gridGap`, `gridRowGap`, and `gridColumnGap` props on `Grid` are reported for manual review, not moved to `sx`. Use `gap`, `rowGap`, and `columnGap` instead.

If a possible responsive value stays flat, the transform keeps other props in the same CSS group flat. For example, moving only `w` alongside `width`, or `rowGap` alongside `gap`, can change which value wins because `sx` has higher priority. Unrelated props such as `color` can still move.

```diff
-<Button variant="primary" width="8x" height="8x" borderRadius="circle">
+<Button variant="primary" sx={{ width: '8x', height: '8x', borderRadius: 'circle' }}>
   Save
 </Button>
```

Preview the changes first:

```bash
npx @tonic-ui/codemod@latest style-props-to-sx src --dry --print
```

Then apply them, and run `eslint --fix` on the changed files afterward to normalize formatting (JSX closing-bracket placement, re-indented multi-line pseudo-prop objects):

```bash
npx @tonic-ui/codemod@latest style-props-to-sx src
```

If the transform can't safely convert a prop (e.g. it's one of the protected component+prop pairs above), it leaves that prop untouched and logs `needs manual review: <Component>.<prop>` for that file instead of guessing.

### `react/v2/import-react-icons`

Updates the import locations for icon components within Tonic UI v2.

In Tonic UI v2, icon components must be imported separately from the `@tonic-ui/react-icons` package. The diff should look like this:

```diff
 import { Badge, Icon } from '@tonic-ui/react';
+import { AlertIcon } from '@tonic-ui/react-icons';
 import React from 'react';

 export default () => (
   <Badge variant="dot">
-    <Icon icon="alert" size="4x" />
+    <Icon as={AlertIcon} size="4x" />
   </Badge>
 );
```

For JavaScript files:

```bash
npx @tonic-ui/codemod@latest react/v2/import-react-icons src --extensions=js,jsx
```


For TypeScript files:

```bash
npx @tonic-ui/codemod@latest react/v2/import-react-icons src --parser=tsx --extensions=ts,tsx
```

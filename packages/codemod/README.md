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

Converts flat style props and pseudo props (e.g. `width="8x"`, `_hover={{ ... }}`) on non-layout `@agentic-ui/react` / `@agentic-ui/react-icons` components into the `sx` prop. Layout primitives (`Box`, `Flex`, `Grid`, `Stack`, `StackItem`, `Space`) are left untouched, since their own flat props are their intended API — as are a small set of components with a specific prop that has real JS behavior beyond CSS (e.g. `Scrollbar`'s `width`/`height`/`overflow`, `Skeleton`'s `animation`, `Toast`'s `appearance` — see the transform's own header comment for the full list and reasoning). Elements with an existing `sx` prop that isn't a plain object literal are left untouched rather than guessed at.

```diff
-<Button variant="primary" width="8x" height="8x" borderRadius="circle">
+<Button variant="primary" sx={{ width: '8x', height: '8x', borderRadius: 'circle' }}>
   Save
 </Button>
```

Preview the changes first:

```bash
npx @agentic-ui/codemod@latest style-props-to-sx src --dry --print
```

Then apply them, and run `eslint --fix` on the changed files afterward to normalize formatting (JSX closing-bracket placement, re-indented multi-line pseudo-prop objects):

```bash
npx @agentic-ui/codemod@latest style-props-to-sx src
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
npx @tonic-ui/codemod@latest react/v2.0.0/import-react-icons src --extensions=js,jsx
```


For TypeScript files:

```bash
npx @tonic-ui/codemod@latest react/v2.0.0/import-react-icons src --parser=tsx --extensions=ts,tsx
```

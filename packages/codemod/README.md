# @tonic-ui/codemod

This repository contains a collection of codemod scripts based for use with [jscodeshift](https://github.com/facebook/jscodeshift) that help update the APIs.

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

### v2.0.0

#### `import-react-icons`

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

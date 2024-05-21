# @tonic-ui/codemod

This repository contains a collection of codemod scripts based for use with [jscodeshift](https://github.com/facebook/jscodeshift) that help update the APIs.

## Usage

```bash
npx @tonic-ui/codemod@latest <codemod> <path>
```

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

```bash
npx @tonic-ui/codemod@latest react/v2.0.0/import-react-icons <path>
```

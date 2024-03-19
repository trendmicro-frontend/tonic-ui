# @tonic-ui/codemod

This repository contains a collection of codemod scripts based for use with [jscodeshift](https://github.com/facebook/jscodeshift) that help update the APIs.

## Usage

```sh
npx @tonic-uii/codemod@latest <codemod> <paths...>
```

```sh
// with npm
npm install @tonic-ui/utils

// with yarn
yarn add @tonic-ui/utils
```

## Transforms

### v2.0.0

#### `import-react-icons`

Updates the import locations for icon components within Tonic UI v2.

In Tonic UI v2, icon components must be imported separately from the `@tonic-ui/react-icons` package.

The diff should look like below:

```diff
-import { Badge, Icon } from '@tonic-ui/react';
+import { Badge } from '@tonic-ui/react';
+import { AlertIcon } from '@tonic-ui/react-icons';
 import React from 'react';

 export default () => (
   <Badge variant="dot">
-    <Icon icon="alert" />
+    <AlertIcon />
   </Badge>
 );
```

To apply this change across your project, run the following command:

```bash
npx @tonic-ui/codemod@latest react/v2.0.0/import-react-icons <path>
```

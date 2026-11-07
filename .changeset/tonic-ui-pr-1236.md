---
"@tonic-ui/react": minor
---

feat(react): add `isClosable` to `SearchInput` and keep void elements in `Highlight`

- `SearchInput`: a close button appears when the input has a value, even if the input is read-only
- `Highlight`: void elements such as `<br />` are no longer cloned with children

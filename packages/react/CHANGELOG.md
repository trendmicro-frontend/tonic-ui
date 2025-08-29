# @tonic-ui/react

## 2.8.2

### Patch Changes

- refactor(react/popover): improve trigger validation and event handler logic by [@cheton](https://github.com/cheton) in [#1061](https://github.com/trendmicro-frontend/tonic-ui/pull/1061)

## 2.8.1

### Patch Changes

- feat(utils): add a lodash-compatible `get` function by [@cheton](https://github.com/cheton) in [#1057](https://github.com/trendmicro-frontend/tonic-ui/pull/1057)

- feat(react/checkbox): ensure consistent styling and correct indeterminate styles by [@cheton](https://github.com/cheton) in [#1058](https://github.com/trendmicro-frontend/tonic-ui/pull/1058)
- Updated dependencies [[`f4e783d`](https://github.com/trendmicro-frontend/tonic-ui/commit/f4e783dd3cac3db3111e876e94b497fc28fccf79), [`e9c5fa6`](https://github.com/trendmicro-frontend/tonic-ui/commit/e9c5fa60db6481cf7fc00b0706f6b12b195c7797)]
  - @tonic-ui/react-base@2.0.3
  - @tonic-ui/react-icons@2.1.2
  - @tonic-ui/styled-system@2.2.1
  - @tonic-ui/utils@2.2.0
  - @tonic-ui/react-hooks@2.2.0

## 2.8.0

### Minor Changes

- feat: enable keyboard support (`Enter`, `Space`) for triggering clicks on a custom trigger element (e.g., a styled `<div>`) by [@cheton](https://github.com/cheton) in [#1003](https://github.com/trendmicro-frontend/tonic-ui/pull/1003)

- feat: enable granular control over outside interactions for drawers and modals by [@cheton](https://github.com/cheton) in [#1033](https://github.com/trendmicro-frontend/tonic-ui/pull/1033)

### Patch Changes

- fix(react/accessibility): add missing `:focus-visible` outline styles for `Link` and `LinkButton` by [@cheton](https://github.com/cheton) in [`eea0dee`](https://github.com/trendmicro-frontend/tonic-ui/commit/eea0dee8f9073e04e1828e552c158058635c4c27)

## 2.7.3

### Patch Changes

- revert(react/InputGroup): restore pseudo-class from 'first-of-type' to ':first-child' to align with ui spec by [@tinaClin](https://github.com/tinaClin) in [#1038](https://github.com/trendmicro-frontend/tonic-ui/pull/1038)

## 2.7.2

### Patch Changes

- fix(react/modal): resolve `closeOnClickOutside` regression for nested modals and modal-drawer scenarios by [@cheton](https://github.com/cheton) in [#1027](https://github.com/trendmicro-frontend/tonic-ui/pull/1027)
- Updated dependencies [[`7e5e290`](https://github.com/trendmicro-frontend/tonic-ui/commit/7e5e290e1442010f39fdba01fdc8a1fa65627f9b)]
  - @tonic-ui/react-hooks@2.1.1

## 2.7.1

### Patch Changes

- fix(drawer): improve full-size drawer dimensions for full-screen span by [@GeorgiDS9](https://github.com/GeorgiDS9) in [#1013](https://github.com/trendmicro-frontend/tonic-ui/pull/1013)

- feat: utilize `useClickOutside` hook to close modals and drawers when clicking outside the content by [@cheton](https://github.com/cheton) in [#1017](https://github.com/trendmicro-frontend/tonic-ui/pull/1017)

- feat(react/search-input): change `_focus` to `_focusVisible` for the close button in `SearchInput` by [@cheton](https://github.com/cheton) in [#1014](https://github.com/trendmicro-frontend/tonic-ui/pull/1014)
- Updated dependencies [[`293fa08`](https://github.com/trendmicro-frontend/tonic-ui/commit/293fa083938aa737cc0705781ea0eabb68bde2b1)]
  - @tonic-ui/react-hooks@2.1.0

## 2.7.0

### Minor Changes

- feat: support arbitrary value types for `CheckboxGroup` and `RadioGroup` components by [@cheton](https://github.com/cheton) in [#1010](https://github.com/trendmicro-frontend/tonic-ui/pull/1010)

## 2.6.5

### Patch Changes

- feat(react/tag): update `_focus` to `_focusVisible` in `Tag` component to enable focus outline on keyboard navigation by [@cheton](https://github.com/cheton) in [#999](https://github.com/trendmicro-frontend/tonic-ui/pull/999)

## 2.6.4

### Patch Changes

- fix(react/InputGroup): replace the pseudo-class ':first-child' with ':first-of-type' by [@cheton](https://github.com/cheton) in [`89e6aea`](https://github.com/trendmicro-frontend/tonic-ui/commit/89e6aea55bbeef9808c7f4ac021121c70b7ae82c)

## 2.6.3

### Patch Changes

- feat: support `referenceRef` in `Popper` to address positioning issue by [@cheton](https://github.com/cheton) in [#991](https://github.com/trendmicro-frontend/tonic-ui/pull/991)

## 2.6.2

### Patch Changes

- feat: use `createTransitionStyle` to compose the `transition` style for various components by [@cheton](https://github.com/cheton) in [#977](https://github.com/trendmicro-frontend/tonic-ui/pull/977)

## 2.6.1

### Patch Changes

- feat(styled-system): introduce `_has`, `_is`, and `_not` style props to support functional pseudo-class selectors by [@cheton](https://github.com/cheton) in [#972](https://github.com/trendmicro-frontend/tonic-ui/pull/972)
- Updated dependencies [[`008d823`](https://github.com/trendmicro-frontend/tonic-ui/commit/008d82315a72b4069d043424ac98298fb46a4415)]
  - @tonic-ui/styled-system@2.2.0

## 2.6.0

### Minor Changes

- feat: `CircularProgress` component by [@cheton](https://github.com/cheton) in [#966](https://github.com/trendmicro-frontend/tonic-ui/pull/966)

- feat(react/date-pickers)!: deprecate `Calendar` and replace it with `DateCalendar` by [@cheton](https://github.com/cheton) in [#961](https://github.com/trendmicro-frontend/tonic-ui/pull/961)

- feat: eliminate the `lodash.get` dependency by [@cheton](https://github.com/cheton) in [#964](https://github.com/trendmicro-frontend/tonic-ui/pull/964)

## 2.5.1

### Patch Changes

- feat(react): add exports for `DefaultPropsProvider` and `useDefaultProps` by [@cheton](https://github.com/cheton) in [#950](https://github.com/trendmicro-frontend/tonic-ui/pull/950)

- feat(react/Popper): use the `useDefaultProps` hook for managing default props by [@cheton](https://github.com/cheton) in [#950](https://github.com/trendmicro-frontend/tonic-ui/pull/950)

- fix(react/theme): fixed a logical error in the `CSSVariables` component by correcting the condition to check for empty `cssVariables` by [@cheton](https://github.com/cheton) in [#953](https://github.com/trendmicro-frontend/tonic-ui/pull/953)

## 2.5.0

### Minor Changes

- feat(react): add `createTheme` for theme customization by [@cheton](https://github.com/cheton) in [#947](https://github.com/trendmicro-frontend/tonic-ui/pull/947)

### Patch Changes

- chore: update package description by [@cheton](https://github.com/cheton) in [`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)
- Updated dependencies [[`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)]
  - @tonic-ui/react-base@2.0.2
  - @tonic-ui/react-hooks@2.0.1
  - @tonic-ui/react-icons@2.1.1
  - @tonic-ui/styled-system@2.0.3
  - @tonic-ui/theme@2.0.1
  - @tonic-ui/utils@2.1.1

## 2.4.0

### Minor Changes

- feat(react/toast): enhance inline toast transition management by [@cheton](https://github.com/cheton) in [#941](https://github.com/trendmicro-frontend/tonic-ui/pull/941)

### Patch Changes

- Updated dependencies [[`22ccadf`](https://github.com/trendmicro-frontend/tonic-ui/commit/22ccadf3e35dac1bb20c43df2d8c2b1a5bf6d6fc)]
  - @tonic-ui/utils@2.1.0

## 2.3.0

### Minor Changes

- feat: improve `disabled` prop handling in `Button` and `ButtonGroup` by [@cheton](https://github.com/cheton) in [#930](https://github.com/trendmicro-frontend/tonic-ui/pull/930)

- fix: resolve bug with `isNameConflictRef.current` in `Checkbox` and `Radio` components by [@cheton](https://github.com/cheton) in [#935](https://github.com/trendmicro-frontend/tonic-ui/pull/935)

- feat(`react/scrollbar`): add `scrollViewProps` to enable passing custom props to the `ScrollView` component by [@cheton](https://github.com/cheton) in [#939](https://github.com/trendmicro-frontend/tonic-ui/pull/939)

## 2.2.0

### Minor Changes

- feat: introduce `DefaultPropsProvider` for setting default props in React components by [@cheton](https://github.com/cheton) in [#922](https://github.com/trendmicro-frontend/tonic-ui/pull/922)

## 2.1.0

### Minor Changes

- feat(react/DatePicker): add `closeOnSelect` prop to automatically close the date picker after a date is selected by [@cheton](https://github.com/cheton) in [#903](https://github.com/trendmicro-frontend/tonic-ui/pull/903)

- test(react/DatePicker): resolve failing test snapshots by [@cheton](https://github.com/cheton) in [#906](https://github.com/trendmicro-frontend/tonic-ui/pull/906)

- feat(react/Calendar): enhance keyboard navigation and date selection by [@cheton](https://github.com/cheton) in [#909](https://github.com/trendmicro-frontend/tonic-ui/pull/909)

### Patch Changes

- fix(react/OverflowTooltip): show the tooltip only when the string is truncated and the `disabled` prop is not true by [@tinaClin](https://github.com/tinaClin) in [#913](https://github.com/trendmicro-frontend/tonic-ui/pull/913)
- Updated dependencies [[`fa0f6cf`](https://github.com/trendmicro-frontend/tonic-ui/commit/fa0f6cf55672689cc2058c512f65afe3854e8e9a), [`272869f`](https://github.com/trendmicro-frontend/tonic-ui/commit/272869f92a6614a66767200a9a4cdf3d50bc07b1)]
  - @tonic-ui/utils@2.0.1
  - @tonic-ui/styled-system@2.0.2

## 2.0.3

### Patch Changes

- fix(react/OverflowTooltip): resolve tooltip misalignment issue with popup menu items by [@tinaClin](https://github.com/tinaClin) in [#894](https://github.com/trendmicro-frontend/tonic-ui/pull/894)

- feat(react): improve tooltip placement and offset calculations by [@cheton](https://github.com/cheton) in [#897](https://github.com/trendmicro-frontend/tonic-ui/pull/897)

# CONTEXT

Shared language for the Tonic UI styling system. Glossary only — no implementation details.

## Styling channels

`Box` composes a styled element from four ordered channels. For declarations of the
same CSS property at the same selector specificity, a **later** channel wins.

| Term | Owner | Precedence | Meaning |
|---|---|---|---|
| **`__sx`** (base sx) | Library (component internals) | Lowest | A component's own base styling. Authored as an sx-object (flat decls, nested selectors, pseudo shortcuts, theme functions, arrays, tokens, responsive values). Internal: not part of the public `BoxProps`, never forwarded to the DOM. |
| **Style props** | Consumer (and, historically, component internals) | Low | Flat layout/appearance props on `Box` (`px`, `bg`, `color`, …), resolved by the `system` transform. |
| **Pseudo props** | Consumer (and, historically, component internals) | High | `_hover`, `_active`, `_focusVisible`, … — each a single prop carrying a style object. |
| **`sx`** | Consumer | Highest | The consumer's escape hatch for arbitrary styles, resolved by the `sx` transform. |

## Distinctions that matter

- **Base styling vs consumer override.** *Base styling* is what a component author writes
  to give the component its look. A *consumer override* is what an app developer writes to
  change it. The design goal is **precedence-by-origin**: a consumer override always beats
  base styling, regardless of which CSS property it touches.

- **Self base styling vs child override.** *Self base styling* is a component styling its
  own `Box`. A *child override* is a wrapper component (e.g. `MenuButton`) changing the
  styling of a child component it renders (e.g. `Button`). These need different channels
  because a child override must out-rank the child's own base styling while still losing to
  the end consumer.

- **Array composition vs object merge.** Combining two sx-objects for the cascade means
  putting them in an **array** (`[a, b]`) so both are emitted and source order resolves
  conflicts *per declaration* (partial override). A plain object merge (`{...a, ...b}`)
  replaces whole keys — a nested key like `&:hover` from `b` discards `a`'s `&:hover`
  entirely (no partial override). The two are not interchangeable.

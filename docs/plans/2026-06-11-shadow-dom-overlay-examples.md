# Shadow DOM Overlay Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a docs example showing Tooltip, Popover, and Menu rendering in-place inside a Shadow DOM boundary, on the Environment page.

**Architecture:** A new self-contained docs example file mirrors the existing `usage-in-shadow-dom.js` scaffold (Emotion cache scoped to a shadow root + `createTheme` with Popper/Portal `containerRef` + `TonicProvider` with `environment={{ value: shadowRoot }}`), but renders three anchored Popper-based overlays instead of a modal. A new MDX subsection renders it. The existing modal example is untouched.

**Tech Stack:** React, `@tonic-ui/react`, `@emotion/react` + `@emotion/cache`, Next.js (react-docs), Playwright (visual verification).

**Note on verification:** Docs examples have no unit-test harness. "Tests" here are: the Next.js build/lint gate (`yarn build`) and Playwright visual confirmation that each overlay opens *inside* the shadow box with no console errors. There is no `jest` step.

---

### Task 1: Create the overlay showcase example file

**Files:**
- Create: `packages/react-docs/pages/components/environment/usage-in-shadow-dom-overlays.js`
- Reference (do NOT modify): `packages/react-docs/pages/components/environment/usage-in-shadow-dom.js`

- [ ] **Step 1: Create the file with the full example**

Create `packages/react-docs/pages/components/environment/usage-in-shadow-dom-overlays.js`:

```jsx
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PortalManager,
  Stack,
  Text,
  Tooltip,
  TonicProvider,
  createTheme,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import BorderedBox from '@/components/BorderedBox';

const NONCE = process.env.NONCE ?? '';

const OverlayShowcase = () => {
  const [colorStyle] = useColorStyle();

  return (
    <BorderedBox
      backgroundColor={colorStyle.background.primary}
      color={colorStyle.color.primary}
      fontSize="sm"
      lineHeight="sm"
      px="4x"
      py="2x"
    >
      <Box>
        <Text>Overlay components rendered inside Shadow DOM</Text>
      </Box>
      <Stack direction="row" spacing="3x" mt="3x">
        <Tooltip label="Tooltip rendered inside Shadow DOM">
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
        <Popover>
          <PopoverTrigger>
            <Button variant="secondary">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Popover</PopoverHeader>
            <PopoverBody>
              This popover is rendered inside the Shadow DOM.
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Menu>
          <MenuButton variant="secondary">Open Menu</MenuButton>
          <MenuList>
            <MenuItem>Menu item 1</MenuItem>
            <MenuItem>Menu item 2</MenuItem>
            <MenuItem>Menu item 3</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </BorderedBox>
  );
};

const ShadowDOMContainer = ({ children, colorMode }) => {
  const hostRef = useRef(null);
  const shadowRootElementRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    const shadowRootElement = document.createElement('div');
    shadowRoot.appendChild(shadowRootElement);
    shadowRootElementRef.current = shadowRootElement;
    rootRef.current = createRoot(shadowRootElement);

    return () => {
      setTimeout(() => {
        rootRef.current?.unmount();
        rootRef.current = null;
        shadowRootElementRef.current = null;
        shadowRoot.replaceChildren();
      }, 0);
    };
  }, []);

  useEffect(() => {
    const shadowRootElement = shadowRootElementRef.current;
    if (!(shadowRootElement instanceof HTMLElement)) {
      return;
    }
    const shadowRoot = shadowRootElement.parentNode;

    // Create Emotion cache with shadow root as container
    const cache = createCache({
      key: 'css',
      nonce: NONCE,
      prepend: true,
      container: shadowRoot,
    });

    // Create theme with CSS variables scoped to :host. Tooltip, Popover, and
    // Menu all position via Popper, so portal their overlays into the shadow
    // root element.
    const shadowTheme = createTheme({
      cssVariables: {
        prefix: 'tonic',
        rootSelector: ':host',
      },
      components: {
        Popper: {
          defaultProps: {
            portalProps: {
              containerRef: shadowRootElementRef,
            },
          },
        },
        PortalManager: {
          defaultProps: {
            containerRef: shadowRootElementRef,
          },
        },
      },
    });

    const root = rootRef.current;
    root.render(
      <CacheProvider value={cache}>
        <TonicProvider
          colorMode={{
            value: colorMode,
          }}
          environment={{
            value: shadowRoot,
          }}
          theme={shadowTheme}
        >
          <PortalManager>
            {children}
          </PortalManager>
        </TonicProvider>
      </CacheProvider>
    );
  }, [children, colorMode]);

  return <Box ref={hostRef} />;
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <ShadowDOMContainer colorMode={colorMode}>
      <OverlayShowcase />
    </ShadowDOMContainer>
  );
};

export default App;
```

- [ ] **Step 2: Lint the new file**

Run: `cd packages/react && npx eslint --ext .js ../react-docs/pages/components/environment/usage-in-shadow-dom-overlays.js`
(Run eslint from the `react-docs` package if it has its own config: `cd packages/react-docs && npx eslint pages/components/environment/usage-in-shadow-dom-overlays.js`.)
Expected: No issues. If `import/no-duplicates` or import-order errors appear, fix imports (single import per source, alphabetized) and re-run.

- [ ] **Step 3: Commit**

```bash
git add packages/react-docs/pages/components/environment/usage-in-shadow-dom-overlays.js
git commit -m "docs(react/environment): add Shadow DOM overlay components example"
```

---

### Task 2: Render the example from the Environment MDX page

**Files:**
- Modify: `packages/react-docs/pages/components/environment/index.page.mdx` (insert after the existing Shadow DOM example, before `### Usage with iframe`)

- [ ] **Step 1: Insert the new subsection**

Find this block:

```mdx
### Usage with Shadow DOM

To render components inside a Shadow DOM, configure the `environment` prop with the shadow root. This ensures modals and other portal-based components render within the shadow DOM boundary:

{render('./usage-in-shadow-dom')}

### Usage with iframe
```

Replace it with:

```mdx
### Usage with Shadow DOM

To render components inside a Shadow DOM, configure the `environment` prop with the shadow root. This ensures modals and other portal-based components render within the shadow DOM boundary:

{render('./usage-in-shadow-dom')}

### Rendering overlay components inside Shadow DOM

Anchored overlay components such as `Tooltip`, `Popover`, and `Menu` open and position within the shadow boundary, rather than escaping to the main document:

{render('./usage-in-shadow-dom-overlays')}

### Usage with iframe
```

- [ ] **Step 2: Commit**

```bash
git add packages/react-docs/pages/components/environment/index.page.mdx
git commit -m "docs(react/environment): render Shadow DOM overlay example on the page"
```

---

### Task 3: Verify in the running docs site (Playwright)

**Files:** none (verification only)

- [ ] **Step 1: Start the docs dev server**

Run (background): `cd packages/react-docs && yarn dev`
Wait until `curl -sf http://localhost:3000/components/environment/` returns 200.

- [ ] **Step 2: Open the page and check for console errors**

Navigate Playwright to `http://localhost:3000/components/environment/`.
Expected: page loads; the new "Rendering overlay components inside Shadow DOM" section is present with three buttons ("Hover me", "Open Popover", "Open Menu"). No new console errors attributable to the example.

- [ ] **Step 3: Verify each overlay opens INSIDE the shadow box**

For each trigger, interact and screenshot:
- Hover "Hover me" → tooltip appears near the button.
- Click "Open Popover" → popover with header/body appears anchored to the button.
- Click "Open Menu" → menu list with 3 items appears anchored to the button.

Confirm visually each overlay is styled (CSS applied) and positioned at its trigger inside the bordered box. Confirm the overlay DOM lives under the shadow host, not the main `document.body` — e.g. evaluate in the page:
```js
// Expect 0: no tonic portals leaked to the main document body for this example
document.body.querySelectorAll(':scope > .tonic-ui-portal').length
```
Expected: overlays render within the shadow root (this selector does not capture the shadow-root portals).

- [ ] **Step 4: Full build gate**

Run: `cd /Users/cheton_wu/Code/trendmicro-frontend/tonic-ui && yarn build`
Expected: `lerna success exec Executed command in N packages` — the `@tonic-ui/react-docs` Next.js build compiles with no ESLint errors (matches the `Build & Test` CI gate).

- [ ] **Step 5: Stop the dev server**

Stop the background `yarn dev` task.

---

## Notes for the implementer

- **Do not modify** `usage-in-shadow-dom.js` (the modal example) or `usage-in-iframe.js`.
- The scaffold is intentionally duplicated from `usage-in-shadow-dom.js` — docs examples here are standalone, self-contained units. Do not extract a shared component.
- If a Popper-based overlay renders *outside* the shadow box (escapes to `document.body`) or appears unstyled, the `Popper.defaultProps.portalProps.containerRef` in the theme is the lever — confirm it points to `shadowRootElementRef`.
- `react-docs` ESLint may enforce import ordering / `import/no-duplicates` (this gate previously broke the docs build). Keep one import statement per module source.

# Task: Improve the ESM CDN with Fallback Documentation and Introduce jsDelivr +esm

## 1. Your Role

You are a frontend engineer working in the Tonic UI monorepo.

Your task is to improve an existing documentation page and introduce jsDelivr `+esm` as an additional ESM loading approach.

**The primary goal is to improve the developer's understanding, not to introduce more architecture.**

Follow these principles:

1. **Human-first documentation:** Write for developers who want to understand and use Tonic UI, not for AI agents or code analysis tools.
2. **Evidence-driven development:** Inspect existing code and verify behavior before making technical claims.
3. **Minimal changes:** Preserve existing working functionality. Avoid unnecessary refactoring.
4. **No assumptions:** Do not invent APIs, CDN capabilities, package exports, file paths, or test results.
5. **Complete validation:** Build, test, and visually inspect the changes before finishing.

Use clear, concise English for all documentation.

Do not stop after writing a plan. Implement and validate the changes.

---

## 2. Goal and Scope

Update this documentation page:

https://trendmicro-frontend.github.io/tonic-ui-docs/v3/integrations/esm-cdn-with-fallback/

Current source:

`packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx`

The updated page must help developers answer five questions:

1. What is CDN-based ESM loading?
2. Can a CDN automatically handle npm dependencies?
3. What is the difference between jsDelivr `+esm`, prebuilt standalone ESM, and esm.sh?
4. Why does Tonic UI still provide a standalone ESM build?
5. Why would an application need CDN fallback?

Readers should understand the differences **before** encountering implementation details such as import maps, manifests, bootstrap scripts, or dependency externalization.

### Required changes

- Improve the documentation structure and readability.
- Introduce jsDelivr `+esm`.
- Add a concise comparison of the three approaches.
- Explain React and Emotion peer dependency considerations.
- Explain the distinct purposes of standalone builds and CDN fallback.
- Preserve the existing interactive runtime inspector.
- Validate jsDelivr `+esm` compatibility before describing it as a supported integration.
- Update tests for any changed behavior or UI.

### Out of scope

Do not:

- Rewrite the existing CDN fallback architecture.
- Replace esm.sh with jsDelivr.
- Introduce a generic multi-CDN provider framework.
- Change the public runtime manifest format.
- Refactor unrelated Tonic UI components.
- Add new dependencies without clear necessity.
- Redesign the entire documentation website.

Keep this task focused.

---

## 3. Inspect the Existing Implementation First

Before editing, read these files.

### Documentation

- `packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx`
- `packages/react-docs/pages/integrations/esm-cdn-with-fallback/usage.js`
- `examples/esm-cdn-with-fallback/README.md`

### Runtime implementation

- `examples/esm-cdn-with-fallback/scripts/manifest.mjs`
- `examples/esm-cdn-with-fallback/scripts/build.mjs`
- `examples/esm-cdn-with-fallback/public/bootstrap.js`
- `examples/esm-cdn-with-fallback/public/inspector-bootstrap.js`

### Package implementation

- `packages/react/package.json`
- `packages/react/rollup.config.mjs`
- `packages/react/README.md`

### Existing tests

- `examples/esm-cdn-with-fallback/test/e2e/esm-cdn-with-fallback.spec.mjs`
- `packages/react-docs/test/e2e/integrations/esm-cdn-with-fallback.spec.mjs`

Also inspect applicable `AGENTS.md` files and existing documentation conventions.

Verify the actual files, exports, and package versions before modifying anything.

Do not assume the repository is identical to an earlier revision.

Do not overwrite unrelated local changes.

---

## 4. Technical Facts and Verification Rules

The following facts define the starting point.

### 4.1 jsDelivr +esm

Example endpoint:

`https://cdn.jsdelivr.net/npm/@tonic-ui/react@3.0.0-alpha.1/+esm`

jsDelivr `+esm` provides an on-demand ESM bundling service.

It can resolve npm dependencies, convert supported CommonJS code, bundle modules, and return browser-compatible ESM output.

However:

- Do not assume every npm package is compatible.
- Do not assume all dependencies are bundled into one HTTP request.
- Do not assume peer dependencies automatically share the application's existing React instance.
- Do not assume jsDelivr supports esm.sh's `external` query parameter.
- Do not assume a successful HTTP response proves React compatibility.

Official reference:

https://www.jsdelivr.com/blog/making-more-npm-packages-work-with-jsdelivr-esm/

### 4.2 Tonic UI peer dependencies

Inspect the actual peer dependency declarations in `packages/react/package.json`.

Pay particular attention to:

- React
- React DOM
- Emotion React
- Emotion Styled

React and React DOM must share a compatible React runtime.

A duplicate React instance can cause invalid hook calls or broken context behavior.

### 4.3 Existing standalone ESM artifact

The repository defines these build outputs:

- `dist/standalone/index.js`
- `dist/standalone/index.min.js`

The standalone build bundles ordinary runtime dependencies while keeping React, React DOM, and Emotion external.

The relevant build configuration is the source of truth.

A direct jsDelivr file URL would have this structure:

`https://cdn.jsdelivr.net/npm/@tonic-ui/react@<version>/dist/standalone/index.min.js`

This is different from `+esm`.

**Important:** A locally built file does not prove that the same file exists in the published npm package.

Verify the published artifact before claiming that the URL works.

### 4.4 Existing fallback implementation

The current example already has:

- CDN-first loading
- Runtime manifests
- Import maps
- Runtime import probes
- Same-origin fallback assets
- Independent runtime groups
- A runtime inspector
- Failure scenarios

Preserve these capabilities.

Do not change the bootstrap or fallback implementation unless necessary to fix a regression directly caused by this task.

Record unrelated problems separately rather than expanding the scope.

---

## 5. Documentation Must Be Human-First

**This is the highest-priority writing requirement.**

Do not structure the documentation around repository files or internal implementation details.

Instead, organize the content around the questions a developer naturally asks.

### Writing rules

1. Explain the problem before describing the implementation.
2. Start with practical use cases rather than architecture.
3. Use simple language where possible.
4. Introduce technical terminology only when needed.
5. Explain why a feature matters before explaining how it works.
6. Prefer short paragraphs.
7. Avoid repeating information across sections.
8. Use comparison tables only when they make choices easier.
9. Keep code examples short and relevant.
10. Put advanced implementation details after the introduction and examples.

Avoid lengthy explanations of Rollup, import-map internals, or individual dependency packages in the opening sections.

### Example of writing style

Avoid:

"The bootstrap dynamically resolves runtime groups through a generated manifest and installs immutable import mappings before executing dependency probes."

Prefer:

"The application loads dependencies from a CDN first. If a required module cannot be loaded, it retries using files hosted by the application."

Explain the technical implementation later.

### Important

The page is a developer guide, not an architecture decision record.

Do not turn it into a long technical report.

The goal is for a developer to understand the available choices and find a working solution.

---

## 6. Required Documentation Structure

Restructure the page using the following outline.

Keep the existing route unchanged.

### Section 1: Browser ESM and CDN Fallback

Replace the narrow introductory focus on esm.sh.

Use this heading:

**Browser ESM and CDN Fallback**

Suggested introduction:

"CDNs can serve npm packages as browser-compatible ES modules, reducing the need to manage every dependency manually.

For React component libraries such as Tonic UI, dependency loading is only part of the problem. Applications also need to share compatible React instances and handle CDN failures.

This guide compares available CDN approaches and demonstrates how to keep an application running when CDN resources are unavailable."

Keep the introduction concise.

Do not mention implementation file names here.

### Section 2: Which Approach Should I Use?

This section must appear near the top.

Introduce three choices:

**jsDelivr +esm**

For exploring on-demand ESM bundling without maintaining a custom bundle.

Requires compatibility verification when used with React component libraries.

**Prebuilt Standalone ESM**

For applications that need explicit dependency boundaries and predictable package artifacts.

The application must provide shared peer dependencies.

**esm.sh with CDN Fallback**

For applications using the existing runtime manifest and fallback integration.

The application can recover from supported startup-time CDN failures.

Provide a small comparison table with:

- Approach
- Main benefit
- Important consideration
- Recommended use case

Do not add unnecessary comparison dimensions.

### Section 3: Loading Tonic UI with jsDelivr +esm

Explain how the endpoint works in plain English.

Show the import syntax:

```js
import * as TonicUI from 'https://cdn.jsdelivr.net/npm/@tonic-ui/react@3.0.0-alpha.1/+esm';
```

Explain:

- The URL tells jsDelivr to produce an ESM representation of the package.
- jsDelivr handles ordinary dependency resolution.
- Developers do not need to manually list every regular dependency.
- The browser loads the module graph returned by the CDN.

**Do not present this import statement as a complete, verified React application.**

The code only demonstrates the import syntax.

Use an actual verified published version. The version above is an example and must not be treated as the latest version.

If the endpoint or its exports cannot be verified, clearly identify the example as unverified.

Add a short explanation of peer dependencies.

Do not immediately introduce complex import-map configuration.

Link to the standalone approach for developers who need explicit shared React dependencies.

### Section 4: Why Use a Standalone ESM Build?

Explain why Tonic UI provides a standalone artifact despite the availability of on-demand CDN bundling.

Focus on these benefits:

- Tonic UI controls which dependencies are bundled.
- React and Emotion can remain external.
- Applications can provide shared dependency instances.
- The resulting artifact is produced and validated during the package build.
- Consumers are not dependent on CDN-specific transformation behavior.

Keep this section concise.

Do not claim standalone builds are always faster or smaller.

Do not claim they always outperform CDN-generated bundles.

### Section 5: CDN Loading Comparison

Provide a more technical comparison of:

- jsDelivr `+esm`
- Prebuilt Standalone ESM
- esm.sh

Include only meaningful differences:

- Bundling ownership
- Dependency handling
- Shared React handling
- Runtime integration
- Main limitation

Explain that CDN fallback is an application-level capability, not an automatic property of any of these CDN endpoints.

Do not duplicate the introductory comparison word-for-word.

### Section 6: Live Demo

Preserve the existing runtime inspector.

Explain what users can learn from it before showing the demo.

Suggested introduction:

"The demo loads React and Tonic UI from a CDN first. You can simulate CDN failures to see how the application switches to locally hosted resources."

Preserve existing scenarios:

- CDN-first
- React CDN failure
- Tonic UI CDN failure
- All CDN failures
- Missing Tonic UI CDN configuration
- All local

Keep the existing runtime status display and log behavior.

Do not add jsDelivr as a selectable provider unless its integration has been verified.

### Section 7: How CDN Fallback Works

Provide a simple explanation:

1. The application selects CDN resources.
2. The browser attempts to load the required modules.
3. The loader checks whether the modules are available.
4. If loading fails, the application reloads using same-origin resources.
5. After dependencies load successfully, the application starts.

Keep the high-level explanation separate from implementation details.

Add a brief limitation note:

"The fallback handles supported startup-time module loading failures. It does not automatically recover from every runtime error after the application starts."

### Section 8: Integration Guide

Preserve the existing installation, Vite configuration, application code, manifest generation, and deployment instructions.

These are still valuable to developers implementing the complete fallback architecture.

Move detailed information under appropriate headings.

Remove duplicated explanations when safe.

Do not silently remove working instructions or required commands.

### Section 9: Troubleshooting

Preserve existing troubleshooting guidance.

Add concise entries for:

- jsDelivr `+esm` transformation failures
- Missing package exports
- Duplicate React instances
- Invalid hook calls
- Emotion styling problems
- Missing standalone artifacts

For each issue, explain:

- What the developer might observe
- The likely cause
- How to investigate or resolve it

Avoid speculative fixes.

---

## 7. Verify jsDelivr +esm Compatibility

Before implementing a live `+esm` example, verify that it works with the package.

### Step 1: Identify the published package version

Inspect the repository and installed package information.

Confirm the version is published.

Do not use `latest`.

### Step 2: Inspect the CDN output

Check:

- HTTP response status
- JavaScript content type
- Whether the endpoint produces ESM
- Available exports
- External imports in the generated output
- Whether React or Emotion may be duplicated

Do not assume the generated output has the same dependency boundaries as Tonic UI's standalone artifact.

### Step 3: Validate in a browser

Use an isolated browser page or iframe.

Test:

- Importing the module
- Rendering Tonic UI components with React DOM
- Rendering inside TonicProvider
- Executing React Hooks
- Reading React Context
- Applying Emotion-generated styles

Check the browser console for runtime errors.

A successful import alone is not enough.

### Step 4: Record the result

Classify the outcome as:

- **Compatible:** The browser integration passes the required checks.
- **Incompatible:** The module loads, but rendering, Hooks, Context, or styling fails.
- **Load failed:** The CDN cannot provide the required module.
- **Not verified:** Testing could not be completed.

Never treat "not verified" as "compatible."

### Step 5: Decide whether to add a live example

If compatibility passes:

- Add a minimal, isolated `+esm` demonstration.
- Reuse existing documentation styles.
- Keep it separate from the current fallback inspector.
- Add corresponding browser tests.

If compatibility fails or remains unverified:

- Do not add a broken live example.
- Document the limitation clearly.
- Keep `+esm` in the comparison and explanatory sections.
- Leave the existing runtime inspector unchanged.

Do not create a workaround that silently loads a different package build while labeling it `+esm`.

---

## 8. Implementation Boundaries

### Files to prioritize

Start with:

1. `packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx`
2. `packages/react-docs/pages/integrations/esm-cdn-with-fallback/usage.js`
3. `examples/esm-cdn-with-fallback/README.md`
4. Existing relevant documentation E2E tests

Only modify additional files when a requirement cannot be satisfied otherwise.

### Files to preserve by default

Do not modify these unless necessary:

- `examples/esm-cdn-with-fallback/public/bootstrap.js`
- `examples/esm-cdn-with-fallback/scripts/manifest.mjs`
- `examples/esm-cdn-with-fallback/scripts/build.mjs`
- `packages/react/rollup.config.mjs`
- `packages/react/package.json`

Do not change package dependencies, published build formats, or runtime interfaces as part of a documentation-only update.

### Existing demo

Preserve:

- Scenario names and behavior
- Runtime group selection
- Source indicators
- Runtime logs
- Fallback handling
- Light and dark mode support

The updated page must remain compatible with its existing documentation route.

---

## 9. Testing and Validation

Run the relevant checks after implementation.

### 9.1 Build and lint

Inspect package scripts and run the appropriate commands for the affected packages.

Do not invent command names.

If a command fails, distinguish an existing failure from a regression introduced by this task.

### 9.2 E2E tests

Use the repository's existing Playwright infrastructure.

The following commands are known examples; confirm they are still supported:

```bash
yarn test:e2e examples --project esm-cdn-with-fallback
yarn test:e2e docs --project esm-cdn-with-fallback
```

Verify that existing fallback scenarios continue working.

Add tests for newly introduced functional behavior.

Do not create a large new test framework.

### 9.3 Visual verification

Review the updated page in a real browser.

Check:

- Desktop layout
- Narrow viewport layout
- Light mode
- Dark mode
- Tables
- Code blocks
- Existing runtime inspector
- New compatibility demonstration, if added

Capture screenshots where supported by the existing tooling.

Inspect the actual screenshots.

Correct visible problems, including:

- Text overflow
- Misalignment
- Inconsistent spacing
- Poor readability
- Broken responsive layout

Do not treat screenshot creation alone as validation.

### 9.4 Network-dependent tests

Live CDN tests may fail because of network restrictions or third-party availability.

Keep deterministic existing CI tests stable.

If a live CDN compatibility test cannot be executed, report it as unverified.

Do not fabricate success.

---

## 10. Strict Anti-Hallucination Rules

These rules are mandatory.

1. **Read before editing.** Never guess file contents.
2. **Verify before claiming.** Do not state that `+esm` works unless tested.
3. **Do not invent CDN query parameters.**
4. **Do not invent package exports or browser APIs.**
5. **Do not invent React compatibility guarantees.**
6. **Do not silently replace one CDN with another.**
7. **Do not assume a successful import proves component compatibility.**
8. **Do not claim a published artifact exists based only on local build files.**
9. **Do not invent benchmark or performance data.**
10. **Do not fabricate test results or screenshots.**
11. **Do not expand the task into an architectural rewrite.**
12. **Do not remove existing functionality to simplify the implementation.**

When uncertain:

- Inspect the implementation.
- Consult official documentation or existing tests.
- Run a focused verification.
- If verification is unavailable, explicitly state the uncertainty.
- Use the smallest safe implementation.

Do not create speculative code merely to fill a missing requirement.

---

## 11. Acceptance Criteria

All of the following must be satisfied.

### Documentation

- [ ] The page is understandable without prior knowledge of the runtime architecture.
- [ ] Readers can identify which CDN approach is appropriate for their situation.
- [ ] jsDelivr `+esm` is explained accurately.
- [ ] React and Emotion compatibility limitations are explained.
- [ ] The value of Tonic UI's standalone ESM build is clear.
- [ ] The value of CDN fallback is clear.
- [ ] Technical implementation details appear after the conceptual introduction.
- [ ] The documentation avoids unnecessary repetition.
- [ ] All links and code examples are accurate.

### Functionality

- [ ] Existing runtime inspector scenarios still work.
- [ ] No existing fallback functionality is removed.
- [ ] Any new live example is independently verified.
- [ ] No unnecessary changes are made to the runtime loader.

### Quality

- [ ] Documentation build passes.
- [ ] Relevant lint checks pass.
- [ ] Existing applicable E2E tests pass, or failures are accurately reported.
- [ ] New functionality is covered by appropriate tests.
- [ ] Visual verification is completed where tooling allows.
- [ ] No unrelated files are modified.

---

## 12. Execution Order

Follow this order exactly.

**Phase 1 — Inspect**

Read relevant files and understand the current integration.

Identify the current package version and runtime contracts.

**Phase 2 — Verify**

Investigate jsDelivr `+esm` behavior.

Determine whether the endpoint supports the required React integration.

Record verified facts and limitations.

**Phase 3 — Update Documentation**

Restructure the page around the required human-first outline.

Add comparison tables and concise code examples.

Preserve all necessary integration instructions.

**Phase 4 — Optional Live Example**

Add an isolated `+esm` demonstration only if browser compatibility has been verified.

Otherwise, document its limitations without adding broken UI.

**Phase 5 — Test**

Run relevant builds, lint, E2E tests, and visual checks.

Fix regressions introduced by this task.

**Phase 6 — Final Review**

Review the complete diff.

Remove unnecessary changes.

Check technical accuracy and readability.

---

## 13. Final Report

After implementation, provide a concise report with exactly these sections.

### Changes Made

List the modified files and briefly explain why each was changed.

### Documentation Improvements

Explain how the updated page is easier for developers to understand.

### jsDelivr +esm Compatibility

State one of:

- Compatible
- Incompatible
- Load failed
- Not verified

Provide supporting evidence.

### Validation

Report actual build, lint, E2E, and visual verification results.

Clearly identify any tests that were not executed.

### Remaining Issues

List remaining limitations and any unrelated problems discovered.

Do not claim completion of work that has not been performed.

---

## Final Instruction

Implement this task now.

Prioritize accurate, readable documentation over additional technical features.

Keep the existing CDN fallback architecture intact.

Do not introduce unnecessary complexity.

**The final documentation should help a human developer make an informed choice, understand the limitations, and successfully follow the recommended integration path.**

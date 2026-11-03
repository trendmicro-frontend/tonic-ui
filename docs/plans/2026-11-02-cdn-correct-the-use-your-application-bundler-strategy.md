# Task: Correct the "Use your application's bundler" strategy

## Objective

Fix the **Use your application's bundler** strategy in the Tonic UI CDN Strategies Comparison.

The goal is to accurately represent normal application bundling, where React, React DOM, Tonic UI, and their required dependencies are processed by the application's bundler rather than loaded as separately managed runtime assets.

**Important: Fix the actual build architecture and measurement presentation. Do not manipulate request counts to match an expected number.**

## 1. Investigate the current implementation

Before modifying code, inspect the actual repository and locate:

- The CDN strategies definitions and comparison UI.
- `scripts/measure-cdn-strategies.mjs`, if present.
- Build scripts and Vite configurations.
- Application entries and runtime entries.
- Import maps, externals, and dependency resolution.
- Generated JavaScript assets and manifests.
- Existing E2E tests and screenshot infrastructure.

Do not assume paths or architecture without verifying the source code.

Determine why the current bundler strategy produces three separate resources:

```text
runtime/react@19.2.7.js
runtime/react-dom@19.2.7.js
runtime/@tonic-ui/react@3.0.0-alpha.3.js
```

Distinguish these two architectures:

**CDN with local fallback**

- Dependencies may be built into separate runtime bundles.
- Import maps resolve package specifiers.
- Dependency groups can independently switch between CDN and local resources.
- This architecture must remain functional.

**Application bundling**

- The application bundler resolves normal package imports.
- React, React DOM, Tonic UI, and required dependencies are included in the application build.
- No separate CDN or fallback runtime is required for these dependencies.
- Output may contain one or multiple JavaScript chunks.

Report the verified root cause briefly before proceeding with the implementation.

## 2. Implement a real application-bundled strategy

Create or correct a dedicated production build for the bundler strategy.

Requirements:

1. Prefer reusing the repository's existing Vite build infrastructure.
2. Import React, React DOM, and Tonic UI through their normal package specifiers.
3. Resolve their required dependencies through the application bundler.
4. Do not externalize React, React DOM, Tonic UI, or Emotion into separately served runtime assets for this strategy.
5. Do not use runtime import maps to resolve those dependencies.
6. Do not depend on CDN URLs or separately generated fallback runtime files.
7. Preserve normal tree shaking, minification, and code splitting.
8. Do not force a single bundle merely to minimize Requests.
9. Avoid duplicate React instances and preserve correct React Hooks, Context, and Provider behavior.
10. Preserve existing styling, CSS asset handling, and Emotion behavior.
11. Ensure production asset URLs work under the repository's deployment base path.
12. Use the same application behavior and package versions as the other strategies wherever possible.

A conceptual output could be:

```text
dist/
└── assets/
    ├── app-[hash].js
    ├── vendor-[hash].js       (optional)
    └── app-[hash].css        (optional)
```

The actual output must be determined by the bundler. Do not hardcode this structure.

Avoid modifying the Tonic UI library's package exports, peer dependencies, standalone build, or CDN integration implementation unless a verified issue makes it necessary.

## 3. Preserve measurement fairness

This is a critical requirement.

All CDN strategies must use a consistent measurement boundary.

First, verify whether existing metrics include:

- Application JavaScript
- Framework and dependency JavaScript
- Bootstrap JavaScript
- Dynamically imported startup chunks

If the existing definition measures all JavaScript responses from navigation until application mount, apply that definition consistently to every strategy.

Do not compare an application bundle containing application code against a CDN strategy measured using dependency-only resources.

If a shared application bundle or bootstrap is excluded from existing measurements, either correct the measurement consistently across all strategies or explicitly distinguish the metric scopes.

Do not silently change the scope for only the bundler strategy.

Maintain:

- Equivalent demo functionality.
- Consistent dependency versions.
- Comparable production builds.
- Consistent browser and network conditions.
- Three cold-cache measurements.
- Median-based reporting.

Use the same mount-completion signal across strategies.

Disable or isolate browser cache and service-worker effects as required by the existing measurement methodology.

When classifying JavaScript responses, account for content types and URLs with query parameters. Do not accidentally omit valid JavaScript modules because the URL does not literally end with `.js` or `.mjs`.

## 4. Preserve honest Requests reporting

Keep Requests based on actual JavaScript network responses.

Examples:

- One startup JavaScript file means one JavaScript response.
- Multiple startup chunks mean multiple JavaScript responses.
- Code-split chunks requested before mount must be counted.
- Bundling dependencies does not make their containing JavaScript files disappear from the network.

Do not:

- Hardcode Requests to 0 or 1.
- Suppress application bundle requests.
- Count individual npm packages as network requests.
- Split one bundle into several synthetic requests.
- Exclude chunks simply because they belong to the application build.

The response list and request categories must accurately reflect observed browser activity.

Use the actual collected measurements for all displayed sizes and counts.

## 5. Separate request classification from bundle contents

The current UI groups requests as:

- React
- Emotion
- Tonic UI
- Others

This works for separate runtime resources, but can be misleading for application bundles.

For the application-bundled strategy, prefer a resource-oriented display:

```text
JavaScript requests (N)

All (N)    Application bundles (N)

Application bundles
  assets/app-[hash].js        [measured size]
  assets/vendor-[hash].js     [if present]

Bundled dependencies
  React
  React DOM
  Tonic UI
  Emotion
```

This is conceptual, not a requirement to produce two chunks.

Use the actual output filenames and measured request counts.

Only show dependencies verified to be included in the production output. Prefer reliable build metadata, such as the bundler's output module information, over filename guessing.

Do not require source-map analysis unless the existing build metadata is insufficient.

The dependency list is informational. It must not contribute additional network requests.

Keep the existing request categories for strategies that load separately identifiable dependency resources.

Use consistent visual design and interaction patterns across all popovers.

Avoid creating a completely different popover component if a small adaptation of the current component is sufficient.

## 6. Keep size metrics accurate

Preserve the existing size metrics and their definitions.

Verify how each is currently calculated:

- Requests
- Transferred Size
- Parsed Size
- Startup Time, if available

Ensure transferred sizes reflect actual transferred JavaScript data according to the existing measurement methodology.

Ensure parsed sizes use the same definition across all strategies.

Do not infer network transfer sizes from source files or source maps.

Do not double-count shared chunks.

Do not assume an application bundle is always smaller or faster than separate CDN resources.

If the current size measurement is incompatible with the new build strategy, correct the methodology consistently rather than introducing strategy-specific exceptions.

## 7. Handle measurement failures correctly

Do not display stale or fabricated results if a build or measurement fails.

Requirements:

- A failed production build must fail the relevant build step.
- A failed application mount must invalidate the measurement run.
- Missing required JavaScript resources must not silently produce a successful result.
- Incomplete measurement samples must not be included in the median.
- Do not fall back to arbitrary default numbers.
- Report unsupported or unavailable measurements explicitly.

For the request-detail popover, select a representative run whose request count matches the median whenever possible.

Ensure its categorized request counts add up to the displayed total for that run.

## 8. Documentation and wording

Keep the strategy title:

**Use your application's bundler**

Suggested description:

> Bundle React, React DOM, Tonic UI, and their dependencies with your application. No separate CDN runtime is required.

Keep the JavaScript Requests explanation concise:

> JavaScript responses fetched before the app mounts, including CDN wrapper modules and duplicate requests. Values are the median of three cold-cache runs.

Clarify that the request details come from one representative measurement.

For bundled dependencies, make it clear that inclusion inside a bundle does not imply separate network requests.

Do not overload the documentation with bundler internals. Explain practical trade-offs in language understandable to frontend developers.

## 9. Regression protection

The new implementation must not break existing strategies:

- esm.sh standalone
- jsDelivr +esm
- raw.esm.sh standalone artifact
- jsDelivr standalone artifact
- Platform-hosted runtime / Emotion-in-app strategy
- CDN with local fallback, where applicable

Verify that existing CDN import maps, dependency sharing, and local fallback mechanisms retain their intended behavior.

Do not remove or rewrite the local fallback runtime bundles merely because they look similar to the resources currently used by the incorrect bundler strategy.

Keep the change scoped to the strategy comparison and its necessary build, measurement, and UI support.

## 10. Testing and evidence

Run the existing relevant tests and extend them where necessary.

### Build verification

- Production build completes successfully.
- Required application dependencies are bundled.
- No unexpected external runtime imports remain.
- Generated asset paths are valid.
- No duplicate React runtime is introduced.

### Network verification

- No separate CDN runtime requests occur for the application-bundled strategy.
- No independently served React, React DOM, or Tonic UI fallback runtime resources are requested.
- All requested JavaScript files belong to the expected application build.
- Request count and resource details match observed network responses.
- Code-split startup chunks are counted.

### Functional verification

- The demo mounts successfully.
- Tonic UI components render correctly.
- React Hooks and Providers behave correctly.
- Emotion styles are applied.
- Light and dark modes work.

### Comparison verification

- All strategies use the same measurement boundary.
- Requests, Transferred Size, and Parsed Size are obtained from actual measurements.
- The three-run median is computed correctly.
- The representative request list is consistent with the displayed total.

### UI verification

- Popover layout is readable.
- Request categories are accurate.
- Long filenames do not break the layout.
- Light and dark mode presentation is correct.
- Existing interactions remain functional.

Use Playwright E2E and screenshots if available in the repository.

## 11. Implementation constraints

- Follow the repository's existing conventions and AGENTS.md instructions.
- Prefer small, focused changes.
- Reuse existing build and measurement utilities.
- Avoid introducing unnecessary dependencies.
- Avoid broad refactoring.
- Avoid changing other CDN strategies to fit the expected result of the bundled strategy.
- Do not hardcode test results or network metrics.
- Do not modify published Tonic UI library behavior to solve a demo-only problem.
- Do not claim a test passed unless it was executed successfully.

If an expected implementation detail differs from the actual repository, follow the verified implementation rather than inventing missing files or APIs.

## 12. Completion report

Implement the solution directly. Do not stop at a proposal.

After implementation, provide a concise report in Traditional Chinese using:

### Root cause
Why the original strategy loaded three separate runtime resources.

### Changes
Files modified and reasons.

### Build output
Actual generated assets and bundled dependencies.

### Measurement comparison
Before/after measurements using the same methodology.

### Validation
Executed tests, results, and any remaining issues.

### Limitations
Anything that could not be verified.

**Success criteria:** The bundler strategy must actually represent normal application bundling, its network measurements must remain truthful and comparable, and the other CDN strategies must continue working without regression.

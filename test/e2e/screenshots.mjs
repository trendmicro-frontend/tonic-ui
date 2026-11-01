import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Single source of screenshot behaviour for every suite.
//
// `E2E_SCREENSHOTS=1` is opt-in: without it these calls write nothing and the
// run stays console-only.
//
// Layout, relative to the suite's own output directory:
//   output/e2e-screenshots/<scenario>/<case>/screenshot.light.png
//   output/e2e-screenshots/<scenario>/<case>/screenshot.dark.png
//   output/e2e-screenshots/<scenario>/<case>/screenshot.png        // no variant
//   output/e2e-screenshots/<scenario>/<case>/manifest.json
//
// Names follow `<artifact>.<variant>.png`. The name describes the picture, not
// the reason only one picture exists. The variant is the colour mode when the
// case has one; a case that does not depend on the colour mode has no variant.
// Every dimension that changes the pixels (colour mode, document/shadow/iframe
// host, backdrop) must appear in `<scenario>` or `<case>`, because the file
// name is the identity of the shot.
const ARTIFACT = 'screenshot';
const enabled = process.env.E2E_SCREENSHOTS === '1';
let base = resolve(process.cwd(), 'output', 'e2e-screenshots');

// Wired by `createE2EConfig` so screenshots sit next to that suite's report.
export const configureScreenshotDirectory = (root) => {
  base = resolve(root, 'output', 'e2e-screenshots');
};

const fileName = (colorMode) => (colorMode === null ? ARTIFACT : `${ARTIFACT}.${colorMode}`) + '.png';

/**
 * Write `<base>/<scenario>/<case>/<name>.png` and update the case manifest.
 * `colorMode: null` writes `screenshot.png`; such a case must pass `reason`
 * explaining why the colour mode does not change what is shown.
 */
export const capture = async (page, scenario, caseName, { colorMode = null, reason = '' } = {}) => {
  if (!enabled) {
    return null;
  }

  if (colorMode !== null && colorMode !== 'light' && colorMode !== 'dark') {
    throw new Error(`capture: colorMode must be "light", "dark", or null, received ${String(colorMode)}`);
  }

  if (colorMode === null && !reason) {
    throw new Error(`capture: "${scenario}/${caseName}" has no colour mode; pass reason to state why it does not depend on one.`);
  }

  const directory = resolve(base, scenario, caseName);
  const path = resolve(directory, fileName(colorMode));
  await mkdir(directory, { recursive: true });
  await page.screenshot({ path });
  await writeManifest(directory, {
    scenario,
    case: caseName,
    modeDependent: colorMode !== null,
    reason: colorMode === null ? reason : '',
    shots: [{ mode: colorMode, artifact: fileName(colorMode), url: page.url() }],
  });
  return path;
};

async function writeManifest(directory, manifest) {
  await writeFile(resolve(directory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

/**
 * Record a mode-dependent case as a light/dark pair. `prepare(colorMode)` loads
 * the fixture for that mode and leaves the page in the state to capture.
 */
export const captureColorModes = async (page, scenario, caseName, prepare) => {
  const directory = resolve(base, scenario, caseName);
  const shots = [];

  // `prepare` carries the assertions, so it runs even when the flag is off.
  for (const colorMode of ['light', 'dark']) {
    await prepare(colorMode);
    if (!enabled) {
      continue;
    }

    await mkdir(directory, { recursive: true });
    const artifact = fileName(colorMode);
    await page.screenshot({ path: resolve(directory, artifact) });
    shots.push({ mode: colorMode, artifact, url: page.url() });
  }

  if (shots.length) {
    await writeManifest(directory, { scenario, case: caseName, modeDependent: true, reason: '', shots });
  }

  return shots.map((shot) => resolve(directory, shot.artifact));
};

import benchmark from '../cdn-benchmark-data.json';

// Every number comes from `scripts/measure-cdn-strategies.mjs`. Nothing here is
// inferred: a configuration is either measured in Chromium or recorded as
// unavailable by the probe that runs before the browser.

// The configurations the page compares. `variant` entries (extra failure cases and
// cross-CDN combinations) stay in the file for the tables that need them.
// `esmsh-external` is measured but hidden: 400 requests for one page is not a
// practical deployment, so the page does not offer it.
const HIDDEN_CONFIG_IDS = new Set(['esmsh-external']);

export const configurations = benchmark.strategies.filter(
  (config) => !config.variant && !HIDDEN_CONFIG_IDS.has(config.id)
);
export const variants = benchmark.strategies.filter((config) => config.variant);

// The six configurations the page walks through, in page order, labelled with the
// section titles they appear under. The single-origin artifact setup is a `variant`
// in the benchmark file but a first-class option on the page.
const PAGE_CONFIGS = [
  { id: 'esmsh-standalone', label: 'Use esm.sh with `?standalone`' },
  { id: 'jsdelivr-esm', label: 'Use jsDelivr with `+esm`' },
  { id: 'esmsh-raw-standalone', label: 'Load `dist/standalone` through `raw.esm.sh`' },
  { id: 'jsdelivr-standalone-jsdelivr-peers', label: 'Load `dist/standalone` through jsDelivr' },
  { id: 'self-hosted-standalone', label: 'Use self-hosted CDN for React and `dist/standalone`' },
  { id: 'app-bundled', label: "Use your application's bundler" },
];

export const pageConfigs = PAGE_CONFIGS
  .map(({ id, label }) => {
    const config = benchmark.strategies.find((entry) => entry.id === id);
    return config ? { ...config, pageLabel: label } : null;
  })
  .filter(Boolean);

export const isMeasured = (config) => config.status === 'measured';

export const num = (value) => Number(value).toLocaleString('en-US');
export const kiB = (value) => `${num(value)} KiB`;

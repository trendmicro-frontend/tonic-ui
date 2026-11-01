import benchmark from '../cdn-benchmark-data.json';

// Every number comes from `scripts/measure-cdn-strategies.mjs`. Nothing here is
// inferred: a configuration is either measured in Chromium or recorded as
// unavailable by the probe that runs before the browser.
export const method = benchmark.method;

// The five configurations the page compares. `variant` entries (extra failure
// cases and cross-CDN combinations) stay in the file for the tables that need them.
export const configurations = benchmark.strategies.filter((config) => !config.variant);
export const variants = benchmark.strategies.filter((config) => config.variant);

export const providers = ['esm.sh', 'jsDelivr', 'Self-hosted'];

export const configsByProvider = providers.map((provider) => ({
  provider,
  configs: configurations.filter((config) => config.provider === provider),
}));

export const CDN_BUILD = 'Bundle built by the CDN';
export const LOCAL_BUILD = 'Bundle built by Tonic UI';
export const builds = [CDN_BUILD, LOCAL_BUILD];

export const isMeasured = (config) => config.status === 'measured';
export const measuredConfigs = configurations.filter(isMeasured);

export const metrics = [
  { key: 'requests', label: 'Requests' },
  { key: 'transferredKiB', label: 'Transferred' },
  { key: 'decodedKiB', label: 'Decoded' },
];

export const num = (value) => Number(value).toLocaleString('en-US');
export const kiB = (value) => `${num(value)} KiB`;
export const metricValue = (config, metric) => (
  metric === 'requests' ? num(config[metric]) : kiB(config[metric])
);

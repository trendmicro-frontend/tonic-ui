// Deterministic synthetic device inventory — shared between module-federation and wujie demos.
//
// Deterministic on purpose: a seeded LCG (no Date.now / Math.random) so the demo
// renders the same rows every time and tests are stable. ~10k rows is enough to
// make DataGrid virtualization meaningful (only visible rows should hit the DOM).
//
// Realistic data model:
//   1. OS type vs OS name: "Windows 10" / "Windows 11" belong to the same OS
//      type ("Windows") and share one agent binary family. Each OS TYPE (Windows,
//      macOS, Linux) ships a separate agent binary, so "latest version" build
//      numbers differ per type.
//   2. "Unknown" means the agent stopped reporting. When Unknown: agentVersion is
//      null (the server has no version data) and lastSeenMinutes is large (7+ days).

// ── Version series helper ─────────────────────────────────────────────────────

/**
 * Build a weighted OS name list from a version range.
 *
 * Weight peaks at `peakIdx` (the most-deployed version in real fleets).
 * Older versions decay linearly; newer versions decay faster because enterprise
 * adoption always lags behind the latest release.
 *
 * @param {string}          prefix   - e.g. 'macOS', 'Ubuntu', 'RHEL'
 * @param {Array<string|number>} versions - ordered oldest → newest
 * @param {number}          peakIdx  - index of the most-deployed version
 * @param {number}          step     - weight lost per step away from peak
 */
function versionSeries(prefix, versions, peakIdx, step = 12) {
  return versions.map((v, i) => {
    const dist = i - peakIdx;
    // Newer-than-peak versions lose weight 1.5× faster (enterprise lags releases).
    const penalty = dist > 0 ? dist * step * 1.5 : Math.abs(dist) * step;
    return { name: `${prefix} ${v}`, weight: Math.max(1, 40 - penalty) };
  });
}

// ── OS taxonomy ───────────────────────────────────────────────────────────────

// Each OS type ships its own agent binary. "Latest" and "Controlled latest"
// build numbers are fixed per type — all up-to-date machines of the same type
// show the same version string, matching real endpoint security deployments.
//
// `weight` on an OS type controls how often that platform is picked overall.
// `names` uses `{ name, weight }` entries so pickWeighted() handles distribution.
const OS_TYPES = [
  {
    type: 'Windows',
    weight: 60, // dominant in enterprise fleets
    // Windows has a heterogeneous mix (desktop / server), so names are
    // defined explicitly rather than generated from a version series.
    // Distribution reflects June 2026: Win10 went EOL Oct 2025, Win11 now dominant.
    // Many enterprises still running Win10 (LTSC or migration in progress).
    names: [
      { name: 'Windows 11', weight: 55 }, // dominant post-Win10 EOL
      { name: 'Windows 10', weight: 25 }, // EOL Oct 2025, enterprises still migrating
      { name: 'Windows Server 2022', weight: 8 }, // current enterprise standard
      { name: 'Windows Server 2019', weight: 7 }, // established, very common in prod
      { name: 'Windows Server 2025', weight: 3 }, // newer deployments
      { name: 'Windows Server 2016', weight: 2 }, // legacy, EOL Jan 2022, still lingers
    ],
    latestBuild: 9050, // the current GA build for Windows
    controlledBuild: 8659, // the IT-pinned "controlled latest" build
    outdatedBuildMin: 1000,
    outdatedBuildMax: 7500,
  },
  {
    type: 'macOS',
    weight: 25,
    // Sequential version numbers → versionSeries() with peak at Sonoma (14).
    // Sequoia (15) is just GA so adoption is still low in corporate fleets.
    names: versionSeries('macOS', [12, 13, 14, 15], 2),
    latestBuild: 6215,
    controlledBuild: 5944,
    outdatedBuildMin: 1000,
    outdatedBuildMax: 5500,
  },
  {
    type: 'Linux',
    weight: 15,
    // Combine Ubuntu LTS (biennial), RHEL, and other distros. Each sub-series
    // peaks at its current most-deployed version in enterprise environments.
    names: [
      ...versionSeries('Ubuntu', ['20.04', '22.04', '24.04'], 1), // 22.04 LTS is the peak
      ...versionSeries('RHEL', [8, 9], 1), // RHEL 9 is the current standard
      { name: 'Debian 12', weight: 5 },
      { name: 'CentOS 7', weight: 5 }, // EOL, still lingers in legacy infra
    ],
    latestBuild: 7388,
    controlledBuild: 7100,
    outdatedBuildMin: 1000,
    outdatedBuildMax: 6800,
  },
];

const RISKS = ['Critical', 'High', 'Medium', 'Low'];

// Statuses that only apply to agents actively reporting back.
const REACHABLE_STATUSES = [
  'Latest version',
  'Controlled latest version',
  'Update recommended',
];

const PATTERN_NAMES = [
  'Smart Scan Agent Pattern',
  'Virus Pattern',
  'IntelliTrap Pattern',
  'Spyware Active-monitoring Pattern',
];

// ── LCG RNG ───────────────────────────────────────────────────────────────────

// Linear congruential generator (numerical-recipes constants) seeded to a fixed value.
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// Weighted pick: each item must have a `weight` property.
// Weights are relative — they don't need to sum to any fixed value.
function pickWeighted(rng, items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let r = rng() * total;
  for (const item of items) {
    r -= item.weight;
    if (r < 0) {
      return item;
    }
  }
  return items[items.length - 1];
}

// ── Version helpers ───────────────────────────────────────────────────────────

// All platforms share major version 14 (product generation).
// The build number differs per OS type (each ships its own binary).
function makeVersionForStatus(rng, cfg, status) {
  let build;
  if (status === 'Latest version') {
    build = cfg.latestBuild;
  } else if (status === 'Controlled latest version') {
    build = cfg.controlledBuild;
  } else {
    // "Update recommended" — random older build within the outdated range.
    const span = cfg.outdatedBuildMax - cfg.outdatedBuildMin;
    build = cfg.outdatedBuildMin + Math.floor(rng() * span);
  }
  return `14.0.0.${build}`;
}

// ── Last-seen helpers ─────────────────────────────────────────────────────────

const SEVEN_DAYS_MIN = 7 * 24 * 60;

// Buckets mirror real fleet behavior: most agents report frequently;
// only ~15% go silent long enough to become Unknown.
const LAST_SEEN_BUCKETS = [
  { weight: 20, min: 0, max: 60 }, // < 1 h — servers, always-on
  { weight: 30, min: 60, max: 24 * 60 }, // 1 h–1 d — normal laptop cadence
  { weight: 25, min: 24 * 60, max: 3 * 24 * 60 }, // 1–3 d — off overnight / weekends
  { weight: 10, min: 3 * 24 * 60, max: SEVEN_DAYS_MIN }, // 3–7 d — traveling / part-time
  { weight: 15, min: SEVEN_DAYS_MIN, max: 90 * 24 * 60 }, // 7–90 d — stale → Unknown
];

function makeLastSeenMinutes(rng) {
  const bucket = pickWeighted(rng, LAST_SEEN_BUCKETS);
  return bucket.min + Math.floor(rng() * (bucket.max - bucket.min));
}

// ── Out-of-date pattern entries ───────────────────────────────────────────────

function makeOutOfDatePatterns(rng) {
  const count = rng() < 0.5 ? 1 : 2;
  const entries = [];
  for (let j = 0; j < count; j += 1) {
    const minor = 100 + Math.floor(rng() * 900);
    entries.push({ name: pick(rng, PATTERN_NAMES), version: `17.${minor}.00` });
  }
  return entries;
}

// ── Row generator ─────────────────────────────────────────────────────────────

/**
 * Generate `count` device rows.
 *
 * Row shape:
 *   { id, hostname, osType, os, risk, lastSeenMinutes,
 *     agentVersionStatus, agentVersion, outOfDatePatterns }
 *
 * - `osType`       — 'Windows' | 'macOS' | 'Linux' (for grouping/filtering)
 * - `os`           — display name, e.g. 'Windows 11'
 * - `agentVersion` — null when status is 'Unknown' (agent not reporting)
 */
function generateDevices(count = 10000) {
  const rng = makeRng(20260619);
  const rows = new Array(count);

  for (let i = 0; i < count; i += 1) {
    const n = String(i + 1).padStart(5, '0');
    const cfg = pickWeighted(rng, OS_TYPES);
    const os = pickWeighted(rng, cfg.names).name;
    const risk = pick(rng, RISKS);
    const lastSeenMinutes = makeLastSeenMinutes(rng);

    // Agents silent for 7+ days cannot report their version — status is Unknown.
    const isStale = lastSeenMinutes >= SEVEN_DAYS_MIN;
    const agentVersionStatus = isStale ? 'Unknown' : pick(rng, REACHABLE_STATUSES);
    const agentVersion = isStale ? null : makeVersionForStatus(rng, cfg, agentVersionStatus);
    const outOfDatePatterns =
      agentVersionStatus === 'Update recommended' ? makeOutOfDatePatterns(rng) : [];

    rows[i] = {
      id: `dev-${n}`,
      hostname: `host-${n}`,
      osType: cfg.type,
      os,
      risk,
      lastSeenMinutes,
      agentVersionStatus,
      agentVersion,
      outOfDatePatterns,
    };
  }

  return rows;
}

// ── Mock API ──────────────────────────────────────────────────────────────────

// Pre-generate once at module load; all API calls serve from this in-memory dataset.
const _devices = generateDevices(10000);

/**
 * Mock API for the Inventory micro-app.
 *
 * Every method returns a Promise so callers are structured identically to real
 * fetch-based API calls. Swapping this module for a real HTTP client requires
 * no changes to the calling components.
 */
export const inventoryApi = {
  /** Returns { items: Device[], total: number } */
  getDevices() {
    return Promise.resolve({ items: _devices, total: _devices.length });
  },

  /** Returns a single Device by id. Rejects if not found. */
  getDevice(id) {
    const device = _devices.find((d) => d.id === id);
    if (!device) {
      return Promise.reject(new Error(`Device not found: ${id}`));
    }
    return Promise.resolve(device);
  },
};

// ── Constants ─────────────────────────────────────────────────────────────────

export const RISK_LEVELS = RISKS;
export const VERSION_STATUS_VALUES = [...REACHABLE_STATUSES, 'Unknown'];
export const OS_TYPE_LIST = OS_TYPES.map((t) => t.type);

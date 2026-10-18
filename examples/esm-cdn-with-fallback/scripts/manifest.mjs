// Runtime manifest helpers for the application and inspector build.
//
// The manifest records package versions, CDN and local candidates,
// application assets, and generated Emotion mappings.
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const require = createRequire(import.meta.url);

// Bare specifiers a runtime bundle may import, by npm package family;
// anything else has no import-map target and would fail at runtime. One
// group per family so the bootstrap can fall back to local sources per
// family.
export const specifiersMap = {
  react: [
    'react',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
  ],
  'react-dom': [
    'react-dom',
    'react-dom/client',
  ],
  '@tonic-ui/react': [
    '@tonic-ui/react',
  ],
};

// Every specifier the families map, for the development plugin's alias table.
export const runtimeSpecifiers = Object.values(specifiersMap).flat();

export const isReact = id => /^(react|react-dom)(\/|$)/.test(id);
export const isTonicUI = id => id.startsWith('@tonic-ui/');

export const packageName = specifier => specifier.startsWith('@')
  ? specifier.split('/').slice(0, 2).join('/')
  : specifier.split('/')[0];

// CDN source configuration for each runtime group, keyed by family name.
// `external` and `standalone` are the esm.sh query flags applied to every
// specifier of the family; `rawFile` opts the family into its single-file
// standalone artifact, served raw from the published npm tarball.
const groupCdnConfig = {
  react: { external: [] },
  'react-dom': { external: ['react'] },
  '@tonic-ui/react': {
    external: ['react', 'react-dom'],
    standalone: true,
    rawFile: 'dist/standalone/index.js',
  },
};

// Installed versions of the given packages, for manifest `versions` fields.
export function versionsOf(names) {
  return Object.fromEntries(names.map(name => [name, require(`${name}/package.json`).version]));
}

export function cdnUrl(specifier, external = [], standalone = false, versions) {
  const name = packageName(specifier);
  const subpath = specifier.slice(name.length);
  // `URLSearchParams` serializes a presence flag as `standalone=`, but
  // esm.sh only honors the bare `standalone` form from its README.
  const query = ['target=es2022'];
  if (standalone) {
    query.push('standalone');
  }
  if (external.length) {
    query.push(`external=${external.join(',')}`);
  }
  return `https://esm.sh/${name}@${versions[name]}${subpath}?${query.join('&')}`;
}

// Whether a runtime URL is served. npm publishes immutable tarballs, so one
// build-time check is valid for the lifetime of a generated manifest. An
// offline build reports unreachable, and the caller selects the esm.sh build.
export async function isReachable(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// The family's CDN source, for one manifest group. esm.sh serves each
// specifier from its own URL with its own `default`, so every specifier maps
// to a distinct build. A family with `rawFile` instead prefers the
// single-file standalone artifact served raw from the published npm tarball:
// the file must exist in the installed package AND the published package must
// expose it (a locally built artifact the published tarball lacks would 404
// at runtime), so the build probes the published URL before selecting it.
// Otherwise the esm.sh build is used. `artifactFile` is the local file
// backing the selected source, or null with the esm.sh build; builds strip
// it before writing the manifest.
export async function groupCdnSource(family, versions) {
  const config = groupCdnConfig[family];
  const specifiers = specifiersMap[family];
  if (!config || !specifiers) {
    throw new Error(`No CDN source configuration for family: ${family}`);
  }
  let artifactFile = null;
  let rawUrl = null;
  if (config.rawFile) {
    const name = packageName(specifiers[0]);
    const packageJson = require.resolve(`${name}/package.json`);
    const candidateFile = join(dirname(packageJson), config.rawFile);
    const candidateUrl = `https://raw.esm.sh/${name}@${versions[name]}/${config.rawFile}`;
    if (existsSync(candidateFile) && (await isReachable(candidateUrl))) {
      artifactFile = candidateFile;
      rawUrl = candidateUrl;
    }
  }
  const imports = {};
  for (const specifier of specifiers) {
    const useRaw = rawUrl && specifier === specifiers[0];
    imports[specifier] = useRaw ? rawUrl : cdnUrl(specifier, config.external, Boolean(config.standalone), versions);
  }
  const source = {
    imports,
    probes: [...specifiers],
  };
  if (artifactFile) {
    source.artifactFile = artifactFile;
  }
  return source;
}

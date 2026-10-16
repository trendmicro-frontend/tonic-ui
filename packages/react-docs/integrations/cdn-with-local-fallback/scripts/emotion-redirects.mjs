// The Tonic bundle imports the Emotion family, which esm.sh otherwise serves as
// a waterfall of small shared modules. The runtime manifest maps the family at
// its single-file `?standalone` builds so the CDN load stays a handful of
// requests.
//
// Two entry shapes need a mapping:
//
// - Bare specifiers. With the published artifact these are exactly the bare
//   specifiers read from the built file.
// - Absolute range URLs. A standalone bundle can import a sibling package
//   through an absolute URL such as
//   `/@emotion/react@^11.0.0-rc.0?external=react&target=es2022`, which no bare
//   mapping covers. That URL resolves to the multi-file Emotion build, not the
//   single-file bundle the bare mapping targets, so it carries a different cache
//   instance. Left unmapped, styles silently disappear: `Box p="4x"` computes
//   `padding: 0px` instead of `16px` with no browser error. Each one is mapped to
//   the same pinned build. The `-rc.0` string is quoted from the `@emotion/styled`
//   peer range; it is not a prerelease install.
const ESM_HOST = 'https://esm.sh/';

const specifiersIn = source =>
  [...new Set([...source.matchAll(/["']([^"']+)["']/g)].map(pair => pair[1]))];

export default function createEmotionRedirects({ cdnUrl, packageName }) {
  const redirects = new Map();
  const fetched = new Set();

  async function sourceOf(url) {
    if (fetched.has(url)) {
      return null;
    }
    fetched.add(url);
    try {
      const response = await fetch(url);
      return response.ok ? await response.text() : null;
    } catch {
      return null;
    }
  }

  // The package-level specifier in an absolute `/@emotion/...` URL, with any
  // `@version` suffix removed: `/@emotion/react@^11.0.0-rc.0` -> `@emotion/react`.
  const packageOf = rawUrl => {
    const pathname = decodeURIComponent(new URL(rawUrl).pathname).slice(1);
    const name = packageName(pathname);
    const at = name.lastIndexOf('@');
    return at > 0 ? name.slice(0, at) : name;
  };

  // Range-form URLs are package-level builds; `/es2022/` paths are prebuilt
  // implementation files that `standalone` does not change.
  const isRangeUrl = specifier =>
    specifier.startsWith('/@emotion/') && !specifier.includes('/es2022/');

  // Collect the range URLs reachable from one resolved bundle, looking through
  // the `/es2022/` implementation files it points at.
  async function collectRangeUrls(target) {
    const source = await sourceOf(target);
    if (!source) {
      return [];
    }
    const found = [];
    for (const specifier of specifiersIn(source)) {
      if (!specifier.startsWith('/') || !specifier.includes('/es2022/')) {
        continue;
      }
      const implSource = await sourceOf(new URL(specifier, ESM_HOST).href);
      if (implSource) {
        found.push(...specifiersIn(implSource).filter(isRangeUrl));
      }
    }
    found.push(...specifiersIn(source).filter(isRangeUrl));
    return [...new Set(found)].map(specifier => new URL(specifier, ESM_HOST).href);
  }

  async function visit(url, resolveTarget) {
    if (redirects.has(url)) {
      return;
    }
    const target = resolveTarget(url);
    if (!target) {
      return;
    }
    redirects.set(url, target);
    for (const nested of await collectRangeUrls(target)) {
      await visit(nested, resolveTarget);
    }
  }

  // Pin the bare specifiers the artifact imports, then map every absolute range
  // URL those builds reach to the same pinned package entry.
  async function fromArtifact(artifactFile) {
    const { readFile } = await import('node:fs/promises');
    const source = await readFile(artifactFile, 'utf-8');
    const specifiers = new Set();
    for (const match of source.matchAll(/from\s*["'](@emotion[^"']+)["']/g)) {
      specifiers.add(match[1]);
    }
    for (const match of source.matchAll(/import\s*["'](@emotion[^"']+)["']/g)) {
      specifiers.add(match[1]);
    }
    const pinned = new Map();
    for (const specifier of specifiers) {
      const target = cdnUrl(specifier, ['react'], true);
      redirects.set(specifier, target);
      pinned.set(packageName(specifier), target);
    }
    const resolveTarget = url => pinned.get(packageOf(url));
    for (const target of pinned.values()) {
      for (const url of await collectRangeUrls(target)) {
        await visit(url, resolveTarget);
      }
    }
  }

  // Walk the live esm.sh graph from the Tonic wrapper. Every range URL keeps
  // its own URL and gains `standalone`, so the keys match what the browser
  // requests.
  async function fromEsmSh(tonicEntry) {
    const wrapper = await sourceOf(tonicEntry);
    if (!wrapper) {
      console.warn('The Tonic CDN wrapper is unreachable; keeping esm.sh normal Emotion module graph.');
      return;
    }
    const resolveTarget = url => `${url}&standalone`;
    for (const specifier of specifiersIn(wrapper).filter(isRangeUrl)) {
      await visit(new URL(specifier, ESM_HOST).href, resolveTarget);
    }
  }

  return {
    async collect({ artifactFile, tonicEntry }) {
      if (artifactFile) {
        await fromArtifact(artifactFile);
      } else {
        await fromEsmSh(tonicEntry);
      }
      return Object.fromEntries(redirects);
    },
  };
}

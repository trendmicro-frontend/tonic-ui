import { configurations, variants } from '../data';
import { buildAppJsx, buildIndexHtml, SETUP_IDS } from '../snippets';

const allConfigs = [...configurations, ...variants];
const setupConfigs = SETUP_IDS.map((id) => allConfigs.find((config) => config.id === id));

const extractImportMap = (html) => {
  const match = html.match(/<script type="importmap">([\s\S]*?)<\/script>/);
  if (!match) {
    return null;
  }
  return JSON.parse(match[1]).imports;
};

describe('copy-paste CDN setups', () => {
  it('offers only configurations that were measured and rendered', () => {
    expect(setupConfigs).toHaveLength(SETUP_IDS.length);
    setupConfigs.forEach((config) => {
      expect(config.status).toBe('measured');
      expect(config.renders).toBe(true);
    });
  });

  it.each(SETUP_IDS)('builds index.html for %s with its measured entry and import map', (id) => {
    const config = allConfigs.find((strategy) => strategy.id === id);
    const html = buildIndexHtml(config);
    const importMap = extractImportMap(html);

    expect(importMap).toEqual(config.importMap);
    expect(html).toContain(`from '${config.entry}'`);
    // The hook only works inside the provider: App must be rendered as a child
    // of TonicProvider, not call useColorMode before it is created.
    expect(html).toContain(
      "createElement(TonicProvider, { colorMode: { defaultValue: 'light' } }, createElement(App))"
    );
  });

  it('wraps the JSX example in a provider before the hook runs', () => {
    const config = allConfigs.find((strategy) => strategy.id === 'esmsh-standalone');
    const jsx = buildAppJsx(config);

    expect(jsx).toContain(`from '${config.entry}'`);
    expect(jsx).toContain("<TonicProvider colorMode={{ defaultValue: 'light' }}>\n    <App />");
  });

  it('routes every shared package to exactly one version', () => {
    const sharedPackage = (target) => {
      const match = target.match(/(react-dom|@emotion\/react|@emotion\/styled|react)@([\d.]+)/);
      return match ? { name: match[1], version: match[2] } : null;
    };

    setupConfigs.forEach((config) => {
      const importMap = extractImportMap(buildIndexHtml(config));
      const byPackage = {};

      Object.values(importMap).forEach((target) => {
        const shared = sharedPackage(target);
        if (shared) {
          byPackage[shared.name] = byPackage[shared.name] ?? new Set();
          byPackage[shared.name].add(shared.version);
        }
      });

      // Two versions in one map means two React or Emotion instances, which is
      // what makes these setups fail.
      Object.entries(byPackage).forEach(([name, versions]) => {
        expect({ name, versions: [...versions] }).toEqual({ name, versions: [versions.values().next().value] });
      });
    });
  });
});

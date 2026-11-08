import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { documentedStyleProps, stylePropNames } from '../generated/rule-data.mjs';

const scriptPath = path.resolve(process.cwd(), 'scripts/generate-rule-data.mjs');

describe('generated rule data', () => {
  // The committed file feeds the allow-list, so a stale file makes no-flat-style-props
  // report documented props. Fail here instead of in a consumer's lint run.
  it('matches the generator output', () => {
    expect(() => {
      execFileSync(process.execPath, [scriptPath, '--check'], { stdio: 'pipe' });
    }).not.toThrow();
  });

  it('lists style props as a frozen array of names', () => {
    expect(Object.isFrozen(stylePropNames)).toBe(true);
    expect(stylePropNames.length).toBeGreaterThan(0);
    expect(new Set(stylePropNames).size).toBe(stylePropNames.length);
    expect(stylePropNames).toEqual([...stylePropNames].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
  });

  it('keys documented props by component name', () => {
    expect(Object.isFrozen(documentedStyleProps)).toBe(true);

    for (const componentName of Object.keys(documentedStyleProps)) {
      expect(componentName).toMatch(/^[A-Z][A-Za-z0-9]*$/);
    }
  });

  it('only documents props that are style props', () => {
    const stylePropSet = new Set(stylePropNames);

    for (const props of Object.values(documentedStyleProps)) {
      expect(props.length).toBeGreaterThan(0);

      for (const prop of props) {
        expect(stylePropSet.has(prop)).toBe(true);
      }
    }
  });

  it('captures the props the rules rely on', () => {
    expect(documentedStyleProps.Scrollbar).toContain('width');
    expect(documentedStyleProps.TableScrollbar).toContain('overflow');
    expect(documentedStyleProps.Spinner).toContain('color');
  });
});

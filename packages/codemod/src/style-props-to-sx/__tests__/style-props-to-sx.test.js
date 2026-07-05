import fs from 'fs';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from '..';

const run = (source) => transform({ source }, { jscodeshift }).toString().trim();

describe('style-props-to-sx', () => {
  it('converts flat/pseudo style props on non-layout components to sx, leaving layout primitives and protected props untouched', () => {
    const source = fs.readFileSync(path.resolve(__dirname, '__fixtures__/style-props-to-sx-source.js'), 'utf8').toString();
    const transformed = transform({ source }, { jscodeshift }).toString();
    const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/style-props-to-sx-expected.js'), 'utf8').toString();
    expect(transformed.trim()).toEqual(expected.trim(), 'The transformed version should be correct');
  });

  it('logs a manual-review warning naming the exact protected component and prop', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = "import { Scrollbar } from '@tonic-ui/react';\nconst App = () => <Scrollbar height=\"200px\" />;\n";
    run(source);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Scrollbar.height'));
    warnSpy.mockRestore();
  });

  it('creates a new sx prop when none exists, at the position of the first extracted attribute', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button variant=\"primary\" width=\"8x\" onClick={handleClick} />;\n";
    const out = run(source);
    expect(out).not.toContain('width="8x"');
    expect(out).toContain("width: '8x'");
    expect(out).toContain('onClick={handleClick}');
    // sx replaces width in place, so it comes before onClick, which followed width in the source.
    expect(out.indexOf('sx={{')).toBeLessThan(out.indexOf('onClick={handleClick}'));
  });

  it('merges a new prop into an existing plain-object sx', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button sx={{ cursor: 'pointer' }} color=\"red\" />;\n";
    const out = run(source);
    expect(out).toContain("cursor: 'pointer'");
    expect(out).toContain("color: 'red'");
    expect(out).not.toContain('color="red"');
  });

  it('does not guess a merge when the existing sx is not a plain object literal', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = "import { Button } from '@tonic-ui/react';\nconst App = (dynamicSx) => <Button sx={dynamicSx} width=\"4x\" />;\n";
    const out = run(source);
    expect(out).toContain('sx={dynamicSx}');
    expect(out).toContain('width="4x"');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('not a plain object literal'));
    warnSpy.mockRestore();
  });

  it('reuses the expression node for a pseudo prop with an object value', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button _hover={{ backgroundColor: 'red' }} />;\n";
    const out = run(source);
    expect(out).toContain('_hover:');
    expect(out).toContain("backgroundColor: 'red'");
    expect(out).not.toContain('_hover={{');
  });

  it('never moves __sx, even though it looks like a style channel', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = (internalSx) => <Button __sx={internalSx} width=\"6x\" />;\n";
    const out = run(source);
    expect(out).toContain('__sx={internalSx}');
    expect(out).toContain("width: '6x'");
  });

  it('does not touch a spread attribute, and keeps it in place', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = (rest) => <Button {...rest} width=\"8x\" />;\n";
    const out = run(source);
    expect(out).toContain('{...rest}');
    expect(out).toContain("width: '8x'");
  });

  it('never touches a whole-component-exempt layout primitive', () => {
    const source = "import { Flex } from '@tonic-ui/react';\nconst App = () => <Flex columnGap=\"4x\" p=\"2x\" />;\n";
    const out = run(source);
    expect(out).toContain('columnGap="4x"');
    expect(out).toContain('p="2x"');
    expect(out).not.toContain('sx=');
  });

  it('converts style props on a component imported from @tonic-ui/react-icons', () => {
    const source = "import { AddIcon } from '@tonic-ui/react-icons';\nconst App = () => <AddIcon color=\"red\" />;\n";
    const out = run(source);
    expect(out).toContain("color: 'red'");
    expect(out).not.toContain('color="red"');
  });

  it('leaves a component untouched when it is not imported from @tonic-ui/react(-icons)', () => {
    const source = "import LocalCard from '../LocalCard';\nconst App = () => <LocalCard width=\"8x\" />;\n";
    const out = run(source);
    expect(out).toContain('width="8x"');
    expect(out).not.toContain('sx=');
  });

  it('leaves a non-style prop untouched', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button variant=\"primary\" width=\"8x\" />;\n";
    const out = run(source);
    expect(out).toContain('variant="primary"');
    expect(out).not.toContain('variant:');
  });

  it('prints a new sx object on one line when it has 1-2 simple string-literal values', () => {
    const oneProp = run("import { Button } from '@tonic-ui/react';\nconst App = () => <Button width=\"8x\" />;\n");
    expect(oneProp).toContain("sx={{width: '8x'}}");

    const twoProps = run("import { Button } from '@tonic-ui/react';\nconst App = () => <Button width=\"8x\" height=\"4x\" />;\n");
    expect(twoProps).toContain("sx={{width: '8x', height: '4x'}}");
  });

  it('falls back to a multi-line sx object once there are more than 2 properties', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button width=\"8x\" height=\"4x\" borderRadius=\"circle\" />;\n";
    const out = run(source);
    expect(out).not.toContain("sx={{width: '8x', height: '4x', borderRadius: 'circle'}}");
    expect(out).toContain("width: '8x'");
    expect(out).toContain("height: '4x'");
    expect(out).toContain("borderRadius: 'circle'");
  });

  it('falls back to a multi-line sx object when a value is not a simple string literal, even with only 1-2 properties', () => {
    const source = "import { Button } from '@tonic-ui/react';\nconst App = () => <Button width=\"8x\" onMouseDown={handleDown} _hover={{ color: 'red' }} />;\n";
    const out = run(source);
    expect(out).not.toContain("sx={{width: '8x', _hover:");
    expect(out).toContain("width: '8x'");
    expect(out).toContain('_hover:');
  });
});

describe('style-props-to-sx: cross-file wrapper resolution', () => {
  // These need a real `file.path` (not just a source string) so the
  // transform can resolve relative imports and read sibling files from
  // disk -- see `resolveWrapper`'s own comment for what shapes it
  // recognizes. Fixtures live in `__fixtures__/wrapper-resolution/`,
  // validated end-to-end against the confirmed real cases this feature
  // was built for (`EditableTag`/`TagInput` in `tag/creating-tags.js`,
  // `TableView` in `tree/dnd/index.js`, in `packages/react-docs`).
  const fixtureDir = path.resolve(__dirname, '__fixtures__/wrapper-resolution');
  const runFile = (filename) => {
    const filePath = path.join(fixtureDir, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    return transform({ source, path: filePath }, { jscodeshift }).toString().trim();
  };

  it('resolves a local wrapper that forwards {...rest} to a real component (one hop), converts, and merges hops', () => {
    const out = runFile('consumer.js');
    const expected = fs.readFileSync(path.resolve(fixtureDir, 'consumer-expected.js'), 'utf8').trim();
    expect(out).toEqual(expected);
  });

  it('resolves through a two-hop chain of local wrappers', () => {
    const out = runFile('consumer.js');
    // NestedWrapper -> MyButton -> Button; both converted identically.
    expect(out).toContain('<NestedWrapper label="Save" sx={{width: \'8x\'}} />');
  });

  it('keeps a prop the wrapper itself intercepts protected, while still converting props it forwards', () => {
    const out = runFile('consumer.js');
    expect(out).toContain('<ProtectingWrapper width="8x"');
    expect(out).toContain("color: 'red'");
  });

  it('leaves a wrapper untouched when it has no rest element to forward through', () => {
    const out = runFile('consumer.js');
    expect(out).toContain('<NoForwardWrapper label="Save" width="8x" />');
  });

  it('converts a wrapper\'s own props even when it resolves to a Layer-1 exempt primitive internally', () => {
    const out = runFile('consumer.js');
    expect(out).toContain('<UsesLayoutPrimitive sx={{width: \'8x\'}} />');
  });

  it('logs a manual-review warning naming the real component behind the wrapper, not the wrapper name', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    runFile('consumer.js');
    // ProtectingWrapper intercepts `width` itself; the real component name
    // (Button) is what gets logged, since that's what a human fixing the
    // manual-review item actually needs to know.
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Button.width'));
    warnSpy.mockRestore();
  });

  it('does not attempt file resolution when no file path is available (e.g. a bare in-memory transform)', () => {
    const source = "import LocalCard from './LocalCard';\nconst App = () => <LocalCard width=\"8x\" />;\n";
    // No `path` key at all -- must not throw trying to resolve a relative import.
    const out = transform({ source }, { jscodeshift }).toString();
    expect(out).toContain('width="8x"');
  });

  it('does not throw and leaves the tag untouched when the relative import cannot be resolved on disk', () => {
    const filePath = path.join(fixtureDir, 'consumer.js');
    const source = "import Nonexistent from './DoesNotExist';\nconst App = () => <Nonexistent width=\"8x\" />;\n";
    const out = transform({ source, path: filePath }, { jscodeshift }).toString();
    expect(out).toContain('width="8x"');
  });
});

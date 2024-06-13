import path from 'path';
import childProcess from 'child_process';
import run from '../codemod-main';

jest.mock('child_process'); // Mock child_process.spawnSync to avoid actual execution

describe('CLI Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocks after each test
  });

  it('should run jscodeshift with correct arguments', () => {
    const mockSpawnSync = jest.spyOn(childProcess, 'spawnSync').mockReturnValue({ error: null });

    const transform = 'react/v2.0.0/import-react-icons';
    const files = ['/path/to/file1.js', '/path/to/file2.js'];
    const flags = {
      extensions: 'js,ts,jsx,tsx,json',
      parser: 'babel',
      ignorePattern: '**/node_modules/**',
      dry: true,
      print: false,
      jscodeshift: null,
    };

    run(transform, files, flags, []);

    // Check if spawnSync was called with correct arguments
    expect(mockSpawnSync).toHaveBeenCalledWith(
      'node',
      expect.arrayContaining([
        expect.stringContaining('jscodeshift'),
        '--transform',
        expect.stringContaining('src'),
        '--extensions',
        'js,ts,jsx,tsx,json',
        '--parser',
        'babel',
        '--ignore-pattern',
        '**/node_modules/**',
        '--dry',
        ...files,
      ]),
      { stdio: 'inherit' }
    );
  });

  it('should handle missing codemod transform', () => {
    const codemod = 'non-existent-codemod';
    const files = ['/path/to/file1.js'];
    const flags = {
      extensions: 'js,ts,jsx,tsx,json',
      parser: 'babel',
      ignorePattern: '**/node_modules/**',
      dry: false,
      print: false,
      jscodeshift: null,
    };

    expect(() => run(codemod, files, flags, [])).toThrowError(
      `${JSON.stringify(codemod)} not found. Check out ${path.resolve(__dirname, '..', './README.md for a list of available codemods.')}`,
    );
  });
});

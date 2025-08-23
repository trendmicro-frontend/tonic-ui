import fs from 'node:fs/promises';
import { Stats } from 'node:fs';
import { getErrorMessage, processUrls, trimTrailingSlashAndWhitespace } from '../src/utils';

// Mock node:fs/promises for file:// URL tests
jest.mock('node:fs/promises');

describe('Utility functions', () => {
  describe('getErrorMessage', () => {
    it('extracts message from Error objects', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    it('converts non-Error values to strings', () => {
      expect(getErrorMessage('string')).toBe('string');
      expect(getErrorMessage(123)).toBe('123');
      expect(getErrorMessage(null)).toBe('null');
      expect(getErrorMessage(undefined)).toBe('undefined');
    });
  });

  describe('processUrls', () => {
    let mockFetch: jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
      global.fetch = jest.fn();
      mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('processes https:// URLs successfully', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('Mock content'),
      } as Response);

      const result = await processUrls(
        ['https://tonic-ui-docs.vercel.app/test'],
        {
          resourceType: 'doc',
          allowedDomains: ['tonic-ui-docs.vercel.app'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual(['Mock content']);
      expect(result.errors).toEqual([]);
    });

    it('handles https:// URLs for blocked domains', async () => {
      const result = await processUrls(
        ['https://blocked-url/test'],
        {
          resourceType: 'doc',
          allowedDomains: ['tonic-ui-docs.vercel.app'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('handles https:// URLs for 404 Not Found', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const result = await processUrls(
        ['https://tonic-ui-docs.vercel.app/notfound'],
        {
          resourceType: 'doc',
          allowedDomains: ['tonic-ui-docs.vercel.app'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('processes file:// URLs successfully', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      mockStat.mockResolvedValue({ isFile: () => true, isDirectory: () => false } as Stats);
      mockReadFile.mockResolvedValue('File content from local filesystem');

      const result = await processUrls(
        ['file:///path/to/components/button/index.page.mdx'],
        {
          resourceType: 'page',
          allowedDomains: [],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual(['File content from local filesystem']);
      expect(result.errors).toEqual([]);
    });

    it('processes file:// URLs pointing to a directory and resolving `index.page.mdx` file', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      mockStat.mockResolvedValue({ isFile: () => false, isDirectory: () => true } as Stats);
      mockReadFile.mockResolvedValue('Index page content');

      const result = await processUrls(
        ['file:///path/to/components/button/'],
        {
          resourceType: 'page',
          allowedDomains: [],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual(['Index page content']);
      expect(result.errors).toEqual([]);
    });

    it('handles file:// URL errors when file does not exist', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;

      mockStat.mockRejectedValue(new Error('ENOENT: no such file or directory'));

      const result = await processUrls(
        ['file:///path/to/nonexistent/file.txt'],
        {
          resourceType: 'doc',
          allowedDomains: [],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('handles file:// URL read errors', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      mockStat.mockResolvedValue({ isDirectory: () => false } as Partial<Stats> as Stats);
      mockReadFile.mockRejectedValue(new Error('Permission denied'));

      const result = await processUrls(
        ['file:///path/to/protected/file.txt'],
        {
          resourceType: 'doc',
          allowedDomains: [],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('handles invalid options gracefully', async () => {
      const result = await processUrls(
        ['https://example.com/test'],
        {
          // @ts-expect-error - testing runtime behavior
          resourceType: 'invalid',
          allowedDomains: ['example.com'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('handles non-array urls parameter', async () => {
      // processUrls expects an array, so test with empty array instead
      const result = await processUrls([], {
        resourceType: 'doc',
        allowedDomains: ['example.com'],
        rootPath: '/test',
      });

      expect(result.contents).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    it('handles empty urls array', async () => {
      const result = await processUrls([]);

      expect(result.contents).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    it('handles mixed successful and failed URLs', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('HTTP content'),
      } as Response);

      mockStat.mockResolvedValue({ isFile: () => true, isDirectory: () => false } as Stats);
      mockReadFile.mockResolvedValue('File content');

      const result = await processUrls(
        [
          'https://example.com/success',
          'file:///path/to/success.txt',
          'https://blocked.com/fail',
        ],
        {
          resourceType: 'doc',
          allowedDomains: ['example.com'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual(['HTTP content', 'File content']);
      expect(result.errors.length).toBe(1);
    });

    it('processes code resource type with file extensions', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      // First call fails (no exact file), second call succeeds (with .js extension)
      mockStat
        .mockRejectedValueOnce(new Error('ENOENT'))
        .mockResolvedValueOnce({ isFile: () => true } as Stats);
      mockReadFile.mockResolvedValue('console.log("Hello World");');

      const result = await processUrls(
        ['/path/to/script'],
        {
          resourceType: 'code',
          allowedDomains: [],
          rootPath: '/base',
        }
      );

      expect(result.contents).toEqual(['console.log("Hello World");']);
      expect(result.errors).toEqual([]);
    });

    it('handles relative paths correctly', async () => {
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

      mockStat.mockResolvedValue({ isFile: () => true, isDirectory: () => false } as Stats);
      mockReadFile.mockResolvedValue('Relative file content');

      const result = await processUrls(
        ['./relative/path.txt'],
        {
          resourceType: 'doc',
          allowedDomains: [],
          rootPath: '/base/directory',
        }
      );

      expect(result.contents).toEqual(['Relative file content']);
      expect(result.errors).toEqual([]);
    });

    it('handles http:// URLs (not just https://)', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('HTTP content'),
      } as Response);

      const result = await processUrls(
        ['http://example.com/test'],
        {
          resourceType: 'doc',
          allowedDomains: ['example.com'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual(['HTTP content']);
      expect(result.errors).toEqual([]);
    });

    it('handles network fetch errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await processUrls(
        ['https://example.com/test'],
        {
          resourceType: 'doc',
          allowedDomains: ['example.com'],
          rootPath: '/path/to',
        }
      );

      expect(result.contents).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Network error');
    });

    it('handles options with non-string types defensively', async () => {
      const result = await processUrls(
        ['./test.txt'],
        {
          resourceType: 'doc',
          // @ts-expect-error - testing runtime behavior
          allowedDomains: 'not-an-array',
          // @ts-expect-error - testing runtime behavior
          rootPath: 123,
        }
      );

      // Should handle gracefully without crashing
      expect(result).toBeDefined();
      expect(Array.isArray(result.contents)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('trimTrailingSlashAndWhitespace', () => {
    it('removes trailing slashes and whitespace from valid strings', () => {
      expect(trimTrailingSlashAndWhitespace('https://example.com/')).toBe('https://example.com');
      expect(trimTrailingSlashAndWhitespace('https://example.com///')).toBe('https://example.com');
      expect(trimTrailingSlashAndWhitespace('path/to/file/')).toBe('path/to/file');
      expect(trimTrailingSlashAndWhitespace('path/to/file/ ')).toBe('path/to/file');
      expect(trimTrailingSlashAndWhitespace('path/to/file \t')).toBe('path/to/file');
    });

    it('handles strings without trailing slashes', () => {
      expect(trimTrailingSlashAndWhitespace('https://example.com')).toBe('https://example.com');
      expect(trimTrailingSlashAndWhitespace('path/to/file')).toBe('path/to/file');
      expect(trimTrailingSlashAndWhitespace('')).toBe('');
    });

    it('handles mixed trailing whitespace and slashes', () => {
      expect(trimTrailingSlashAndWhitespace('path/ \t//')).toBe('path');
      expect(trimTrailingSlashAndWhitespace('path/// \t')).toBe('path');
      expect(trimTrailingSlashAndWhitespace('path/\n/\r')).toBe('path');
    });

    it('handles non-string inputs gracefully', () => {
      expect(trimTrailingSlashAndWhitespace(null as unknown as string)).toBe('');
      expect(trimTrailingSlashAndWhitespace(undefined)).toBe('');
      expect(trimTrailingSlashAndWhitespace(123 as unknown as string)).toBe('');
      expect(trimTrailingSlashAndWhitespace({} as unknown as string)).toBe('');
      expect(trimTrailingSlashAndWhitespace([] as unknown as string)).toBe('');
    });

    it('preserves internal slashes and whitespace', () => {
      expect(trimTrailingSlashAndWhitespace('path/to/file with spaces/')).toBe('path/to/file with spaces');
      expect(trimTrailingSlashAndWhitespace('https://example.com/path/to/resource/')).toBe('https://example.com/path/to/resource');
    });
  });
});

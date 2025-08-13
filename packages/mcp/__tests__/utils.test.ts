import fs, { Stats } from 'node:fs/promises';
import { processUrls, getErrorMessage } from '../src/utils';

// Mock node:fs/promises for file:// URL tests
jest.mock('node:fs/promises');

describe('Utility Functions', () => {
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
  });
});

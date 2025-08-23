import { loadConfig } from '../src/config-loader';
import { createMcpServer } from '../src/server';
import { Config } from '../src/types/config';
import { processUrls } from '../src/utils';
import pkg from '../package.json';

jest.mock('../src/config-loader');

jest.mock('../src/utils', () => {
  const actual = jest.requireActual('../src/utils');
  return {
    ...actual, // keep all original exports
    processUrls: jest.fn(),
    // do not mock trimTrailingSlashAndWhitespace → stays real
  };
});

const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const mockProcessUrls = processUrls as jest.MockedFunction<typeof processUrls>;

const defaultServerName = pkg.name;
const defaultServerVersion = pkg.version;
const defaultServerConfigPath = '/path/to/tonic-ui/tonic-ui-mcp.config.js';

describe('createMcpServer', () => {
  const config: Config = {
    packages: [
      {
        name: '@tonic-ui/react',
        version: '2.0.0',
        llms: 'packages/react-docs/pages/llms.txt',
        pageBase: 'packages/react-docs/pages/',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadConfig.mockResolvedValue(config);
  });

  it('creates a server instance', async () => {
    const server = await createMcpServer({
      name: defaultServerName,
      version: defaultServerVersion,
      configPath: defaultServerConfigPath,
    });
    expect(server).toBeDefined();

    // Check if the server has the expected tools registered
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(Object.keys((server as any)._registeredTools).length).toBe(3);

    const tools = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useDocs: (server as any)._registeredTools['use-docs'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchPages: (server as any)._registeredTools['fetch-pages'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchCodes: (server as any)._registeredTools['fetch-codes'],
    };

    // Check the useDocs tool
    expect(tools.useDocs).toBeDefined();
    expect(tools.useDocs.title).toBe('use docs');
    expect(tools.useDocs.description).toBe(`You must use this tool to answer any questions related to Tonic UI components or documentation.

The description of the tool contains the available packages, as listed below:
- @tonic-ui/react@2.0.0

1. Pick the most suitable package from the above list, and use that as the \"packages\" argument for this tool's execution, to get the docs content. If it's just one, let it be an array with one package.
2. Analyze the URLs listed in the content.
3. Then use "fetch-pages" tool to fetch specific documentation pages relevant to the user's question with the subsequent tool call.`);

    // Check the fetchPages tool
    expect(tools.fetchPages).toBeDefined();
    expect(tools.fetchPages.title).toBe('fetch pages');
    expect(tools.fetchPages.description).toBe('Fetch pages for one or more URLs extracted from the "use-docs" tool call responses. The URLs should be passed as an array in the "urls" argument.');

    // Check the fetchCodes tool
    expect(tools.fetchCodes).toBeDefined();
    expect(tools.fetchCodes.title).toBe('fetch codes');
    expect(tools.fetchCodes.description).toBe(`Fetch codes for one or more "render('./example')" calls found in responses from the "fetch-pages" tool. The first argument inside a render call is relative to the corresponding URL returned by the "fetch-pages" tool.

For example, for "render('./example')":
* pageBase="/path/to/"
  url="/path/to/example"
* pageBase="https://example.com/path/to/"
  url="https://example.com/path/to/example"
* pageBase="file:///path/to/"
  url="file:///path/to/example"

Pass an array of **absolute URLs** in the "urls" argument.`);
  });

  describe('registered tool: use-docs', () => {
    let server;
    let tools;

    beforeEach(async () => {
      // Reset mocks before each test
      jest.clearAllMocks();
      mockLoadConfig.mockResolvedValue(config);

      server = await createMcpServer({
        name: defaultServerName,
        version: defaultServerVersion,
        configPath: defaultServerConfigPath,
      });

      tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchPages: (server as any)._registeredTools['fetch-pages'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchCodes: (server as any)._registeredTools['fetch-codes'],
      };
    });

    it('returns LLMs content successfully', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: ['This is the LLMs content'],
        errors: [],
      });

      const result = await tools.useDocs.callback({
        packages: ['@tonic-ui/react@2.0.0'],
      });

      expect(mockProcessUrls).toHaveBeenCalledWith(
        ['packages/react-docs/pages/llms.txt'],
        {
          resourceType: 'doc',
          allowedDomains: ['127.0.0.1', 'localhost'],
          rootPath: '/path/to/tonic-ui',
        }
      );

      expect(result).toEqual({
        content: [{ text: 'This is the LLMs content', type: 'text' }]
      });
    });

    it('handles errors when fetching LLMs content', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [],
        errors: ['Failed to fetch LLMs content'],
      });

      const result = await tools.useDocs.callback({
        packages: ['@tonic-ui/react@2.0.0'],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: Failed to fetch LLMs content',
          },
        ],
        isError: true,
      });
    });
  });

  describe('registered tool: fetch-pages', () => {
    let server;
    let tools;

    beforeEach(async () => {
      // Reset mocks before each test
      jest.clearAllMocks();
      mockLoadConfig.mockResolvedValue(config);

      server = await createMcpServer({
        name: defaultServerName,
        version: defaultServerVersion,
        configPath: defaultServerConfigPath,
      });

      tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchPages: (server as any)._registeredTools['fetch-pages'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchCodes: (server as any)._registeredTools['fetch-codes'],
      };
    });

    it('fetches and combines multiple page contents', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [
          'This is the page content for button',
          'This is the page content for input',
        ],
        errors: [],
      });

      const result = await tools.fetchPages.callback({
        urls: [
          'file:///path/to/tonic-ui/packages/react-docs/pages/components/button/index.page.mdx',
          'file:///path/to/tonic-ui/packages/react-docs/pages/components/input/index.page.mdx',
        ]
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'This is the page content for button\n\n---\n\nThis is the page content for input',
          },
        ],
      });
    });

    it('handles fetch errors gracefully', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [],
        errors: ['Error fetching URL'],
      });

      const result = await tools.fetchPages.callback({
        urls: [
          'file:///path/to/tonic-one/packages/react-docs/pages/components/button/index.page.mdx',
        ],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: Error fetching URL',
          },
        ],
        isError: true,
      });
    });
  });

  describe('registered tool: fetch-codes', () => {
    let server;
    let tools;

    beforeEach(async () => {
      // Reset mocks before each test
      jest.clearAllMocks();
      mockLoadConfig.mockResolvedValue(config);

      server = await createMcpServer({
        name: defaultServerName,
        version: defaultServerVersion,
        configPath: defaultServerConfigPath,
      });

      tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchPages: (server as any)._registeredTools['fetch-pages'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchCodes: (server as any)._registeredTools['fetch-codes'],
      };
    });

    it('fetches and combines multiple code contents', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [
          'const App = () => <Button>Click me</Button>; export default App;',
          'const App = () => <Input />; export default App;',
        ],
        errors: [],
      });

      const result = await tools.fetchCodes.callback({
        urls: [
          'file:///path/to/tonic-ui/packages/react-docs/pages/components/button/usage.js',
          'file:///path/to/tonic-ui/packages/react-docs/pages/components/input/usage.js',
        ]
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: [
              'const App = () => <Button>Click me</Button>; export default App;',
              'const App = () => <Input />; export default App;',
            ].join('\n\n---\n\n'),
          },
        ],
      });
    });

    it('handles fetch errors gracefully', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [],
        errors: ['Error fetching code'],
      });

      const result = await tools.fetchCodes.callback({
        urls: [
          'file:///path/to/tonic-ui/packages/react-docs/pages/components/code.js',
        ],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: Error fetching code',
          },
        ],
        isError: true,
      });
    });

    it('validates urls parameter', async () => {
      const result = await tools.fetchCodes.callback({
        urls: [],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: "urls" must be a non-empty array',
          },
        ],
        isError: true,
      });
    });

    it('validates urls parameter for fetch-pages', async () => {
      const result = await tools.fetchPages.callback({
        urls: [],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: "urls" must be a non-empty array',
          },
        ],
        isError: true,
      });
    });

    it('handles non-array urls parameter for fetch-pages', async () => {
      const result = await tools.fetchPages.callback({
        urls: 'not-an-array' as unknown as string[],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: "urls" must be a non-empty array',
          },
        ],
        isError: true,
      });
    });

    it('handles non-array urls parameter for fetch-codes', async () => {
      const result = await tools.fetchCodes.callback({
        urls: 'not-an-array' as unknown as string[],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: "urls" must be a non-empty array',
          },
        ],
        isError: true,
      });
    });

    it('handles processUrls throwing error for use-docs', async () => {
      mockProcessUrls.mockRejectedValue(new Error('Network timeout'));

      const result = await tools.useDocs.callback({
        packages: ['@tonic-ui/react@2.0.0'],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: Network timeout',
          },
        ],
        isError: true,
      });
    });

    it('handles processUrls throwing error for fetch-pages', async () => {
      mockProcessUrls.mockRejectedValue(new Error('File system error'));

      const result = await tools.fetchPages.callback({
        urls: ['file:///path/to/index.page.mdx'],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: File system error',
          },
        ],
        isError: true,
      });
    });

    it('handles processUrls throwing error for fetch-codes', async () => {
      mockProcessUrls.mockRejectedValue(new Error('Code file not found'));

      const result = await tools.fetchCodes.callback({
        urls: ['file:///path/to/code.js'],
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'Error: Code file not found',
          },
        ],
        isError: true,
      });
    });

    it('handles empty packages array for use-docs', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [],
        errors: [],
      });

      const result = await tools.useDocs.callback({
        packages: [],
      });

      // Should still work, just with empty URLs array
      expect(mockProcessUrls).toHaveBeenCalledWith([], expect.any(Object));
      expect(result).toEqual({
        content: [{ text: '', type: 'text' }]
      });
    });

    it('handles non-existent packages for use-docs', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: [],
        errors: [],
      });

      const result = await tools.useDocs.callback({
        packages: ['@non-existent/package@1.0.0'],
      });

      expect(mockProcessUrls).toHaveBeenCalledWith(
        [],
        {
          resourceType: 'doc',
          allowedDomains: ['127.0.0.1', 'localhost'],
          rootPath: '/path/to/tonic-ui',
        }
      );

      expect(result).toEqual({
        content: [{ text: '', type: 'text' }]
      });
    });

    it('handles pageBase path correctly in use-docs', async () => {
      const config = {
        packages: [
          {
            name: '@tonic-ui/react',
            version: '2.0.0',
            llms: 'packages/react-docs/pages/llms.txt',
            pageBase: 'packages/react-docs/pages/',
          },
        ],
      };
      mockLoadConfig.mockResolvedValueOnce(config);

      const server = await createMcpServer({
        name: defaultServerName,
        version: defaultServerVersion,
        configPath: defaultServerConfigPath,
      });

      const tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
      };

      mockProcessUrls.mockResolvedValue({
        contents: ['[Installation]({{PAGE_BASE}}/getting-started/installation/): <classification>LLM should read this page when ...</classification>'],
        errors: [],
      });

      const result = await tools.useDocs.callback({
        packages: ['@tonic-ui/react@2.0.0'],
      });

      expect(result.content[0].text).toContain('[Installation](/path/to/tonic-ui/packages/react-docs/pages/getting-started/installation/): <classification>LLM should read this page when ...</classification>');
    });

    it('handles multiple contents with separators', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: ['First content', 'Second content', 'Third content'],
        errors: [],
      });

      const result = await tools.fetchPages.callback({
        urls: ['url1', 'url2', 'url3'],
      });

      expect(result.content[0].text).toBe('First content\n\n---\n\nSecond content\n\n---\n\nThird content');
    });
  });

  describe('server configuration and initialization', () => {
    it('creates server with default name and version when not provided', async () => {
      const server = await createMcpServer({
        configPath: defaultServerConfigPath,
      });

      expect(server).toBeDefined();
      expect(mockLoadConfig).toHaveBeenCalledWith(defaultServerConfigPath);
    });

    it('registers all three tools correctly', async () => {
      const server = await createMcpServer({
        name: defaultServerName,
        version: defaultServerVersion,
        configPath: defaultServerConfigPath,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const registeredTools = (server as any)._registeredTools;

      expect(Object.keys(registeredTools)).toEqual([
        'use-docs',
        'fetch-pages',
        'fetch-codes'
      ]);
    });

    it('handles config loading errors', async () => {
      mockLoadConfig.mockRejectedValue(new Error('Config file not found'));

      await expect(createMcpServer({ configPath: defaultServerConfigPath }))
        .rejects.toThrow('Config file not found');
    });
  });
});

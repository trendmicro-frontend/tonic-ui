import { createMcpServer } from '../src/server';
import { Config } from '../src/types/config';
import { loadConfig } from '../src/config-loader';
import { processUrls, getErrorMessage } from '../src/utils';

jest.mock('../src/config-loader');
jest.mock('../src/utils');

const mockLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;
const mockProcessUrls = processUrls as jest.MockedFunction<typeof processUrls>;
const mockGetErrorMessage = getErrorMessage as jest.MockedFunction<typeof getErrorMessage>;

describe('createMcpServer', () => {
  const config: Config = {
    allowedDomains: ['tonic-ui-docs.vercel.app'],
    packages: [
      {
        name: '@tonic-ui/react',
        version: '2.0.0',
        llms: 'https://tonic-ui-docs.vercel.app/v2/react/llms/llms.txt',
        pageBase: 'https://tonic-ui-docs.vercel.app/v2/react/pages/',
      },
      {
        name: '@tonic-ui/react',
        version: '1.0.0',
        llms: 'https://tonic-ui-docs.vercel.app/v1/react/llms/llms.txt',
        pageBase: 'https://tonic-ui-docs.vercel.app/v1/react/pages/',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadConfig.mockResolvedValue(config);
    mockGetErrorMessage.mockImplementation((error) => {
      return error instanceof Error ? error.message : String(error);
    });
  });

  it('creates a server instance', async () => {
    const server = await createMcpServer({ name: '@tonic-ui/mcp', version: '1.0.0', configPath: '/path/to/tonic-ui-mcp.config.js' });
    expect(server).toBeDefined();

    // Check if the server has the expected tools registered
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(Object.keys((server as any)._registeredTools).length).toBe(2);

    const tools = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useDocs: (server as any)._registeredTools['use-docs'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchDocs: (server as any)._registeredTools['fetch-docs'],
    };

    // Check the useDocs tool
    expect(tools.useDocs).toBeDefined();
    expect(tools.useDocs.title).toBe('Use documentation');
    expect(tools.useDocs.description).toBe(`You must use this tool to answer any questions related to Tonic UI components or documentation.

The description of the tool contains the available packages, as listed below:
- @tonic-ui/react@2.0.0
- @tonic-ui/react@1.0.0

1. Pick the most suitable package from the above list, and use that as the \"packages\" argument for this tool's execution, to get the docs content. If it's just one, let it be an array with one package.
2. Analyze the URLs listed in the content.
3. Then use "fetch-docs" tool to fetch specific documentation pages relevant to the user's question with the subsequent tool call.`);

    // Check the fetchDocs tool
    expect(tools.fetchDocs).toBeDefined();
    expect(tools.fetchDocs.title).toBe('Fetch documentation');
    expect(tools.fetchDocs.description).toBe('Fetch documentation for one or more URLs extracted from previous tool calls responses. The URLs should be passed as an array in the "urls" argument.');
  });

  describe('registered tool: use-docs', () => {
    let server;
    let tools;

    beforeAll(async () => {
      server = await createMcpServer({ name: '@tonic-ui/mcp', version: '1.0.0', configPath: '/path/to/tonic-ui-mcp.config.js' });
      tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchDocs: (server as any)._registeredTools['fetch-docs'],
      };
    });

    it('returns LLMs content successfully', async () => {
      mockProcessUrls.mockResolvedValue({
        contents: ['This is the LLMs content'],
        errors: [],
      });

      const result = await tools.useDocs.callback({
        packages: ['@tonic-ui/react@1.0.0'],
      });

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
        packages: ['@tonic-ui/react@0.1.0'],
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

  describe('registered tool: fetch-docs', () => {
    let server;
    let tools;

    beforeAll(async () => {
      server = await createMcpServer({ name: '@tonic-ui/mcp', version: '1.0.0', configPath: '/path/to/tonic-ui-mcp.config.js' });
      tools = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDocs: (server as any)._registeredTools['use-docs'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchDocs: (server as any)._registeredTools['fetch-docs'],
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

      const result = await tools.fetchDocs.callback({
        urls: [
          'file:///path/to/v2/react/pages/button/index.mdx',
          'file:///path/to/v2/react/pages/input/index.mdx',
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

      const result = await tools.fetchDocs.callback({
        urls: ['https://tonic-ui-docs.vercel.app/v2/react/pages/404/index.mdx'],
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
});

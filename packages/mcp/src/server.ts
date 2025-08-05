import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import trimEnd from 'lodash/trimEnd';
import { z } from 'zod';
import { getErrorMessage, processUrls } from './utils';
import { loadConfig } from './config-loader';

interface McpServerOptions {
  name?: string;
  version?: string;
  configPath: string;
}

export const createMcpServer = async ({ name, version, configPath }: McpServerOptions) => {
  // Create server instance
  const server = new McpServer({
    name: name ?? '',
    version: version ?? '',
  });

  const config = await loadConfig(configPath);
  const defaultDomains = [
    '127.0.0.1',
    'localhost',
  ];
  const rootPath = path.dirname(configPath);

  server.registerTool(
    'use-docs',
    {
      title: 'Use documentation',
      description: `You must use this tool to answer any questions related to Tonic UI components or documentation.

The description of the tool contains the available packages, as listed below:
${config.packages.map(pkg => `- ${pkg.name}@${pkg.version}`).join('\n')}

1. Pick the most suitable package from the above list, and use that as the "packages" argument for this tool's execution, to get the docs content. If it's just one, let it be an array with one package.
2. Analyze the URLs listed in the content.
3. Then use "fetch-docs" tool to fetch specific documentation pages relevant to the user's question with the subsequent tool call.`,
      inputSchema: {
        packages: z
          .array(z.string())
          .describe('The list of packages to fetch the documentation from'),
      },
    },
    async ({ packages }) => {
      try {
        const urls = packages.reduce<string[]>((acc, _package) => {
          const packageConfig = config.packages.find(pkg => {
            return `${pkg.name}@${pkg.version}` === _package;
          });
          if (!packageConfig || !packageConfig.llms) {
            return acc;
          }
          return [
            ...acc,
            packageConfig.llms,
          ];
        }, []);

        const { contents, errors } = await processUrls(urls, {
          allowedDomains: defaultDomains,
          rootPath: rootPath
        });

        if (contents.length === 0 && errors.length > 0) {
          throw new Error(errors.join('\n'));
        }

        // Use pageBase from the first package config for PAGE_BASE replacement
        const firstPackageConfig = config.packages.find(pkg => {
          return packages.some(_package => `${pkg.name}@${pkg.version}` === _package);
        });

        // Remove trailing slash from pageBase and remove leading/trailing whitespace
        const pageBaseWithoutTrailingSlash = trimEnd(firstPackageConfig?.pageBase, '/').trim();
        const combinedContent = contents
          .map(x => x.replaceAll('{{PAGE_BASE}}', pageBaseWithoutTrailingSlash))
          .join('\n\n---\n\n')
          .trim();

        return {
          content: [{
            type: 'text',
            text: combinedContent,
          }]
        };
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
          content: [{
            type: 'text',
            text: `Error: ${errorMessage}`,
          }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    'fetch-docs',
    {
      title: 'Fetch documentation',
      description: 'Fetch documentation for one or more URLs extracted from previous tool calls responses. The URLs should be passed as an array in the "urls" argument.',
      inputSchema: {
        urls: z
          .array(z.string())
          .describe('The list of URLs to fetch the documentation from'),
      },
    },
    async ({ urls }) => {
      try {
        if (!Array.isArray(urls) || urls.length === 0) {
          throw new Error('"urls" must be a non-empty array');
        }

        const { contents, errors } = await processUrls(urls, {
          allowedDomains: defaultDomains,
          rootPath: rootPath,
        });

        if (contents.length === 0 && errors.length > 0) {
          throw new Error(errors.join('\n'));
        }

        const combinedContent = contents
          .join('\n\n---\n\n')
          .trim();
        return {
          content: [{
            type: 'text',
            text: combinedContent,
          }]
        };
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
          content: [{
            type: 'text',
            text: `Error: ${errorMessage}`,
          }],
          isError: true,
        };
      }
    }
  );

  return server;
};

import path from 'node:path';
import { loadConfig } from '../config-loader';

describe('loadConfig', () => {
  it('should load config in JSON format', async () => {
    const configPath = path.resolve(__dirname, '__fixtures__', 'tonic-ui-mcp.config.json');
    const config = await loadConfig(configPath);
    expect(config.packages).toEqual([{
      name: '@tonic-ui/react',
      version: '2.0.0',
      llms: 'packages/react-docs/pages/llms.txt',
      pageBase: 'packages/react-docs/pages/',
    }]);
  });

  it('should load config in JavaScript format', async () => {
    const configPath = path.resolve(__dirname, '__fixtures__', 'tonic-ui-mcp.config.js');
    const config = await loadConfig(configPath);
    expect(config.packages).toEqual([{
      name: '@tonic-ui/react',
      version: '2.0.0',
      llms: 'packages/react-docs/pages/llms.txt',
      pageBase: 'packages/react-docs/pages/',
    }]);
  });
});

import fs from 'node:fs';
import { loadConfig } from '../src/config-loader';

jest.mock('node:fs');

describe('loadConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and enhance valid JSON config', async () => {
    const inputConfig = {
      allowedDomains: ['tonic-ui-docs.vercel.app'],
      packages: [
        {
          name: '@tonic-ui/react',
          version: '2.0.0',
          llms: 'https://tonic-ui-docs.vercel.app/v2/react/llms/llms.txt',
          pageBase: 'https://tonic-ui-docs.vercel.app/v2/react/pages/',
        },
      ],
    };

    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(true);
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue(JSON.stringify(inputConfig));

    const config = await loadConfig('/path/config.json');

    expect(config.packages).toEqual(inputConfig.packages);
  });
});

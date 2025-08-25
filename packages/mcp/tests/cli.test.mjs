import { test, describe } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '..', '..', '..', 'tonic-ui-mcp.config.js');
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf-8'));

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 5000,
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: parsedData, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

describe('CLI tests', () => {
  describe('Argument parsing', () => {
    test('should exit with error when config is missing', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const process = spawn('node', [cliPath]);
      let stderr = '';

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      const exitCode = await new Promise((resolve) => {
        process.on('close', resolve);
      });

      assert.strictEqual(exitCode, 1);
      assert(stderr.includes('Error: Configuration file is required'));
    });

    test('should exit with error for invalid transport type', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const process = spawn('node', [cliPath, '--config', configPath, '--type', 'invalid']);
      let stderr = '';

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      const exitCode = await new Promise((resolve) => {
        process.on('close', resolve);
      });

      assert.strictEqual(exitCode, 1);
      assert(stderr.includes('Invalid transport type "invalid"'));
    });

    test('should exit with error for invalid port number', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const process = spawn('node', [cliPath, '--config', configPath, '--type', 'streamable-http', '--port', '99999']);
      let stderr = '';

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      const exitCode = await new Promise((resolve) => {
        process.on('close', resolve);
      });

      assert.strictEqual(exitCode, 1);
      assert(stderr.includes('Port must be between 1 and 65535'));
    });

    test('should show help when --help is used', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const process = spawn('node', [cliPath, '--help']);
      let stdout = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      const exitCode = await new Promise((resolve) => {
        process.on('close', resolve);
      });

      assert.strictEqual(exitCode, 0);
      assert(stdout.includes('Usage:'));
      assert(stdout.includes('-t, --type <type>'));
      assert(stdout.includes('-c, --config <path>'));
    });

    test('should show version when --version is used', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const process = spawn('node', [cliPath, '--version']);
      let stdout = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      const exitCode = await new Promise((resolve) => {
        process.on('close', resolve);
      });

      assert.strictEqual(exitCode, 0);
      assert(/\d+\.\d+\.\d+/.test(stdout));
    });
  });

  describe('Transport type: stdio', () => {
    test('should start server successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const serverProcess = spawn('node', [cliPath, '--config', configPath, '--type', 'stdio']);

      try {
        // Wait for server to start
        await new Promise((resolve, reject) => {
          let stderr = '';
          const timeout = setTimeout(() => reject(new Error('Server start timeout')), 3000);

          serverProcess.stderr.on('data', (data) => {
            stderr += data.toString();
            if (stderr.includes('🚀 Tonic UI MCP server is running on stdio')) {
              clearTimeout(timeout);
              resolve();
            }
          });
        });
      } finally {
        serverProcess.kill('SIGTERM');
      }
    });

    test('should list MCP tools successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');

      // Create MCP client and connect to the server
      const transport = new StdioClientTransport({
        command: 'node',
        args: [cliPath, '--config', configPath, '--type', 'stdio']
      });

      const client = new Client({
        name: pkg.name,
        version: pkg.version,
      }, {
        capabilities: {}
      });

      try {
        await client.connect(transport);

        // List tools
        const { tools } = await client.listTools();
        const toolNames = tools.map(tool => tool.name);
        assert.deepEqual(toolNames, ['use-docs', 'fetch-pages', 'fetch-codes']);
      } finally {
        await client.close();
      }
    });
  });

  describe('Transport type: streamable-http', () => {
    test('should start server successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const port = 3000;
      const serverProcess = spawn('node', [cliPath, '--config', configPath, '--type', 'streamable-http', '--port', port.toString()]);

      try {
        // Wait for server to start
        await new Promise((resolve, reject) => {
          let stdout = '';
          const timeout = setTimeout(() => reject(new Error('Server start timeout')), 3000);

          serverProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            if (stdout.includes(`🚀 Tonic UI MCP server is running on HTTP port ${port} (streamable-http)`)) {
              clearTimeout(timeout);
              resolve();
            }
          });
        });

        // Test the endpoint
        const response = await makeRequest(`http://127.0.0.1:${port}/`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.name, pkg.name);
        assert.strictEqual(response.data.version, pkg.version);
        assert.strictEqual(response.data.transport, 'streamable-http');
        assert(response.data.endpoints && response.data.endpoints.mcp);
        assert.strictEqual(response.data.endpoints.mcp, 'POST /mcp');
      } finally {
        serverProcess.kill('SIGTERM');
      }
    });

    test('should list MCP tools successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const port = 3000;
      const serverProcess = spawn('node', [cliPath, '--config', configPath, '--type', 'streamable-http', '--port', port.toString()]);
      const client = new Client({
        name: pkg.name,
        version: pkg.version,
      }, {
        capabilities: {}
      });

      try {
        // Wait for server to start
        await new Promise((resolve, reject) => {
          let stdout = '';
          const timeout = setTimeout(() => reject(new Error('Server start timeout')), 3000);

          serverProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            if (stdout.includes(`🚀 Tonic UI MCP server is running on HTTP port ${port} (streamable-http)`)) {
              clearTimeout(timeout);
              resolve();
            }
          });
        });

        // Create MCP client and connect to the server
        const transport = new StreamableHTTPClientTransport(
          new URL(`http://127.0.0.1:${port}/mcp`)
        );

        await client.connect(transport);

        // List tools
        const { tools } = await client.listTools();
        const toolNames = tools.map(tool => tool.name);
        assert.deepEqual(toolNames, ['use-docs', 'fetch-pages', 'fetch-codes']);
      } finally {
        await client.close();
        serverProcess.kill('SIGTERM');
      }
    });
  });

  describe('Transport type: sse', () => {
    test('should start server successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const port = 3000;
      const serverProcess = spawn('node', [cliPath, '--config', configPath, '--type', 'sse', '--port', port.toString()]);

      try {
        // Wait for server to start
        await new Promise((resolve, reject) => {
          let stdout = '';
          const timeout = setTimeout(() => reject(new Error('Server start timeout')), 3000);

          serverProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            if (stdout.includes(`🚀 Tonic UI MCP server is running on HTTP port ${port} (sse)`)) {
              clearTimeout(timeout);
              resolve();
            }
          });
        });

        // Test the endpoint
        const response = await makeRequest(`http://127.0.0.1:${port}/`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.name, pkg.name);
        assert.strictEqual(response.data.version, pkg.version);
        assert.strictEqual(response.data.transport, 'sse');
        assert(response.data.endpoints && response.data.endpoints.sse && response.data.endpoints.messages);
        assert.strictEqual(response.data.endpoints.sse, 'GET /sse');
        assert.strictEqual(response.data.endpoints.messages, 'POST /messages');
      } finally {
        serverProcess.kill('SIGTERM');
      }
    });

    test('should list MCP tools successfully', async () => {
      const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
      const port = 3000;
      const serverProcess = spawn('node', [cliPath, '--config', configPath, '--type', 'sse', '--port', port.toString()]);
      const client = new Client({
        name: pkg.name,
        version: pkg.version,
      }, {
        capabilities: {}
      });

      try {
        // Wait for server to start
        await new Promise((resolve, reject) => {
          let stdout = '';
          const timeout = setTimeout(() => reject(new Error('Server start timeout')), 3000);

          serverProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            if (stdout.includes(`🚀 Tonic UI MCP server is running on HTTP port ${port} (sse)`)) {
              clearTimeout(timeout);
              resolve();
            }
          });
        });

        // Create MCP client and connect to the server
        const transport = new SSEClientTransport(
          new URL(`http://127.0.0.1:${port}/sse`)
        );

        await client.connect(transport);

        // List tools
        const { tools } = await client.listTools();
        const toolNames = tools.map(tool => tool.name);
        assert.deepEqual(toolNames, ['use-docs', 'fetch-pages', 'fetch-codes']);
      } finally {
        await client.close();
        serverProcess.kill('SIGTERM');
      }
    });
  });
});

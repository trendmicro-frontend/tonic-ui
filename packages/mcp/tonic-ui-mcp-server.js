#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { Command } = require('commander');

const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');
const { isInitializeRequest } = require('@modelcontextprotocol/sdk/types.js');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { createMcpServer } = require('./dist/index.cjs');

// Read version from package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonContent);

const MCP_SERVER_NAME = packageJson.name;
const MCP_SERVER_DESCRIPTION = packageJson.description;
const MCP_SERVER_VERSION = packageJson.version ?? '1.0.0';

/**
 * Parse command-line arguments using Commander.js
 */
function parseArgs() {
  const program = new Command();

  program
    .description(MCP_SERVER_DESCRIPTION)
    .version(MCP_SERVER_VERSION)
    .option('-c, --config <path>', 'path to configuration file (JavaScript or JSON format)')
    .helpOption('-h, --help', 'display help for command');

  program.parse();

  const options = program.opts();

  if (!options.config) {
    console.error('Error: Configuration file is required.\n');
    program.outputHelp();
    process.exit(1);
  }

  return {
    ...options,
  };
}

function findAvailablePort(startPort, maxAttempts = 10) {
  const net = require('node:net');

  return new Promise((resolve, reject) => {
    let currentPort = startPort;
    let attempts = 0;

    function tryPort() {
      if (attempts >= maxAttempts) {
        reject(new Error(`Could not find an available port after ${maxAttempts} attempts starting from ${startPort}`));
        return;
      }

      const testServer = net.createServer();

      testServer.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          attempts++;
          currentPort++;
          console.error(`Port ${currentPort - 1} is in use, trying port ${currentPort}...`);
          tryPort();
        } else {
          reject(err);
        }
      });

      testServer.on('listening', () => {
        testServer.close(() => {
          resolve(currentPort);
        });
      });

      testServer.listen(currentPort);
    }

    tryPort();
  });
}

async function main() {
  try {
    const options = parseArgs();
    const resolvedConfigPath = path.isAbsolute(options.config)
      ? options.config
      : path.resolve(process.cwd(), options.config);

    let port;
    let requestedPort;

    if (process.env.MCP_PORT) {
      // If MCP_PORT is explicitly set, use that exact port (don't search for alternatives)
      port = parseInt(process.env.MCP_PORT, 10);
      requestedPort = port;
    } else {
      // If MCP_PORT is not set, find an available port starting from 3000
      requestedPort = 3000;
      try {
        // Attempt to find an available port starting from the requested port
        port = await findAvailablePort(requestedPort);
      } catch (error) {
        console.error('Failed to find an available port:', error.message);
        process.exit(1);
      }
    }

    // Store transports for each session type
    const transports = {
      streamable: {},
      sse: {},
    };

    const app = express();
    app.use(express.json());
    app.use(morgan('common'));

    // Configure CORS with required headers
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'mcp-session-id'],
      exposedHeaders: ['Mcp-Session-Id'],
      credentials: false
    }));

    // POST /mcp - Handle MCP requests with streamable transport
    app.post('/mcp', async (req, res) => {
      const sessionId = req.headers['mcp-session-id'];
      let transport = null;

      if (sessionId && transports.streamable[sessionId]) {
        // Reuse existing transport if sessionId is provided
        transport = transports.streamable[sessionId];
        //console.log(`Reusing existing transport for sessionId: ${sessionId}`);
      } else if (!sessionId && isInitializeRequest(req.body)) {
        // Create a new transport for the request
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sessionId) => {
            // Store the transport by session ID
            transports.streamable[sessionId] = transport;
          },
          // DNS rebinding protection is disabled by default for backwards compatibility.
          // If you are running this server locally, make sure to set:
          //enableDnsRebindingProtection: true,
          //allowedHosts: ['127.0.0.1'],
        });

        // Clean up transport when closed
        transport.onclose = () => {
          if (transport.sessionId) {
            delete transports.streamable[transport.sessionId];
          }
        };

        const mcpServer = createMcpServer({
          name: MCP_SERVER_NAME,
          version: MCP_SERVER_VERSION,
          configPath: resolvedConfigPath,
        });

        // Connect to the MCP server
        await mcpServer.connect(transport);
      } else {
        // Invalid request
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message: 'Bad Request: No valid session ID provided',
          },
          id: null,
        });
        return;
      }

      // Handle the request
      await transport.handleRequest(req, res, req.body);
    });

    // Reusable handler for GET and DELETE requests
    const handleSessionRequest = async (req, res) => {
      const sessionId = req.headers['mcp-session-id'];
      if (!sessionId || !transports.streamable[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
      }

      const transport = transports.streamable[sessionId];
      await transport.handleRequest(req, res);
    };

    // Handle GET requests for server-to-client notifications via SSE
    app.get('/mcp', handleSessionRequest);

    // Handle DELETE requests for session termination
    app.delete('/mcp', handleSessionRequest);

    // [deprecated] Legacy SSE endpoint for older clients
    app.get('/sse', async (req, res) => {
      // Create SSE transport for legacy clients
      const transport = new SSEServerTransport('/messages', res);
      transports.sse[transport.sessionId] = transport;

      res.on('close', () => {
        delete transports.sse[transport.sessionId];
      });

      // Create new server instance for stateless mode
      const mcpServer = createMcpServer({
        name: MCP_SERVER_NAME,
        version: MCP_SERVER_VERSION,
        configPath: resolvedConfigPath,
      });
      await mcpServer.connect(transport);
    });

    // [deprecated] Legacy message endpoint for older clients
    app.post('/messages', async (req, res) => {
      const sessionId = req.query.sessionId;
      const transport = transports.sse[sessionId];
      if (transport) {
        await transport.handlePostMessage(req, res, req.body);
      } else {
        res.status(400).send('No transport found for sessionId');
      }
    });

    // Root endpoint - Server info
    app.get('/', (req, res) => {
      res.json({
        name: 'tonic-ui-mcp',
        version: packageJson.version ?? '1.0.0',
        endpoints: {
          mcp: 'POST /mcp',
          sse: 'GET /sse',
        }
      });
    });

    app.use('*', (req, res) => {
      res.status(404).end();
    });

    // Global error handler
    app.use((error, req, res) => {
      console.error('Express error handler:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'An unexpected error occurred',
        });
      }
    });

    // Start the server
    const server = app.listen(port, () => {
      console.log(`🚀 Tonic UI MCP server is running on HTTP port ${port}`);
      console.log(`Loaded config file: ${resolvedConfigPath}`);
      console.log('Available endpoints:');
      console.log(`• Streamable HTTP: http://127.0.0.1:${port}/mcp`);
      console.log(`• SSE (deprecated): http://127.0.0.1:${port}/sse`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('HTTP server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start MCP server:', error.message);
    if (error.code) {
      console.error(`• Error code: ${error.code}`);
    }
    if (error.validationErrors) {
      console.error('• Validation errors:');
      error.validationErrors.forEach(err => {
        console.error(`  - ${err.field}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});

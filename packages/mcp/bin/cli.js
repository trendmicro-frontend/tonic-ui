#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { Command } = require('commander');

const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { isInitializeRequest } = require('@modelcontextprotocol/sdk/types.js');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { createMcpServer } = require('../dist/index.cjs');

// Read version from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
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
    .name(`npx ${MCP_SERVER_NAME}`)
    .description(MCP_SERVER_DESCRIPTION)
    .version(MCP_SERVER_VERSION)
    .option('-c, --config <path>', 'path to configuration file (JavaScript or JSON format)')
    .option('-t, --type <type>', 'transport type (choices: stdio, streamable-http, sse)', 'stdio')
    .option('-p, --port <port>', 'port number for HTTP-based transports (streamable-http, sse) (default: 3000)', parseInt)
    .helpOption('-h, --help', 'display help for command');

  program.parse();

  const options = program.opts();

  if (!options.config) {
    console.error('Error: Configuration file is required.\n');
    program.outputHelp();
    process.exit(1);
  }

  // Validate transport type
  const validTypes = ['stdio', 'streamable-http', 'sse'];
  if (!validTypes.includes(options.type)) {
    console.error(`Error: Invalid transport type "${options.type}". Valid choices are: ${validTypes.join(', ')}\n`);
    program.outputHelp();
    process.exit(1);
  }

  if (options.port && (options.port < 1 || options.port > 65535)) {
    console.error(`Error: Port must be between 1 and 65535, got ${options.port}\n`);
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

async function runStdioServer(resolvedConfigPath) {
  try {
    const server = await createMcpServer({
      name: MCP_SERVER_NAME,
      version: MCP_SERVER_VERSION,
      configPath: resolvedConfigPath,
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('🚀 Tonic UI MCP server running on stdio');
    console.error(`Loaded config file: ${resolvedConfigPath}`);
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
async function runStreamableHTTPServer(resolvedConfigPath, port = 3000) {
  try {
    const serverPort = await findAvailablePort(port);
    const transportMap = new Map();

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

      if (sessionId && transportMap.has(sessionId)) {
        // Reuse existing transport if sessionId is provided
        transport = transportMap.get(sessionId);
      } else if (!sessionId && isInitializeRequest(req.body)) {
        // Create a new transport for the request
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sessionId) => {
            // Store the transport by session ID
            transportMap.set(sessionId, transport);
          },
        });

        // Clean up transport when closed
        transport.onclose = () => {
          if (transport.sessionId) {
            transportMap.delete(transport.sessionId);
          }
        };

        const mcpServer = await createMcpServer({
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
      if (!sessionId || !transportMap.has(sessionId)) {
        res.status(400).send('Invalid or missing session ID');
        return;
      }

      const transport = transportMap.get(sessionId);
      await transport.handleRequest(req, res);
    };

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        name: packageJson.name,
        version: packageJson.version ?? '1.0.0',
        transport: 'streamable-http',
        endpoints: {
          mcp: 'POST /mcp',
        }
      });
    });

    // Handle GET requests for server-to-client notifications via SSE
    app.get('/mcp', handleSessionRequest);

    // Handle DELETE requests for session termination
    app.delete('/mcp', handleSessionRequest);

    app.use('*', (req, res) => {
      res.status(404).end();
    });

    // Global error handler
    app.use((error, req, res, next) => {
      console.error('Express error handler:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'An unexpected error occurred',
        });
      }
    });

    // Start the server
    const server = app.listen(serverPort, () => {
      console.log(`🚀 Tonic UI MCP server is running on HTTP port ${serverPort} (streamable-http)`);
      console.log(`Loaded config file: ${resolvedConfigPath}`);
      console.log('Available endpoints:');
      console.log(`• Streamable HTTP: http://127.0.0.1:${serverPort}/mcp`);
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

async function runSSEServer(resolvedConfigPath, port = 3000) {
  try {
    const serverPort = await findAvailablePort(port);
    const transportMap = new Map();

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

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        name: packageJson.name,
        version: packageJson.version ?? '1.0.0',
        transport: 'sse',
        endpoints: {
          sse: 'GET /sse',
          messages: 'POST /messages',
        }
      });
    });

    // SSE endpoint
    app.get('/sse', async (req, res) => {
      // Create SSE transport
      const transport = new SSEServerTransport('/messages', res);
      transportMap.set(transport.sessionId, transport);

      res.on('close', () => {
        transportMap.delete(transport.sessionId);
      });

      // Create new server instance for stateless mode
      const mcpServer = await createMcpServer({
        name: MCP_SERVER_NAME,
        version: MCP_SERVER_VERSION,
        configPath: resolvedConfigPath,
      });
      await mcpServer.connect(transport);
    });

    // Message endpoint for SSE
    app.post('/messages', async (req, res) => {
      const sessionId = req.query.sessionId;
      const transport = transportMap.get(sessionId);
      if (transport) {
        await transport.handlePostMessage(req, res, req.body);
      } else {
        res.status(400).send('No transport found for sessionId');
      }
    });

    app.use('*', (req, res) => {
      res.status(404).end();
    });

    // Global error handler
    app.use((error, req, res, next) => {
      console.error('Express error handler:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'An unexpected error occurred',
        });
      }
    });

    // Start the server
    const server = app.listen(serverPort, () => {
      console.log(`🚀 Tonic UI MCP server is running on HTTP port ${serverPort} (sse)`);
      console.log(`Loaded config file: ${resolvedConfigPath}`);
      console.log('Available endpoints:');
      console.log(`• SSE: http://127.0.0.1:${serverPort}/sse`);
      console.log(`• Messages: http://127.0.0.1:${serverPort}/messages`);
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

async function main() {
  const options = parseArgs();
  const resolvedConfigPath = path.isAbsolute(options.config)
    ? options.config
    : path.resolve(process.cwd(), options.config);

  if (options.type === 'streamable-http') {
    await runStreamableHTTPServer(resolvedConfigPath, options.port);
  } else if (options.type === 'sse') {
    await runSSEServer(resolvedConfigPath, options.port);
  } else { // stdio (default)
    await runStdioServer(resolvedConfigPath);
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});

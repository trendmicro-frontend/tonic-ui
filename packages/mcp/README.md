# @tonic-ui/mcp

A Model Context Protocol (MCP) server for Tonic UI.

## Overview

The MCP server provides structured access to Tonic UI documentation and resources. It enables AI agents and tools to retrieve detailed information about Tonic UI, including:
* Accurate, official documentation
* Up-to-date information directly from the source
* Reliable answers based on authoritative content

Learn more about MCP in the [official MCP documentation](https://modelcontextprotocol.io/introduction).

## Quickstart

### Prerequisites

1. Clone the Tonic UI repository:
  ```bash
  git clone https://github.com/trendmicro-frontend/tonic-ui.git
  cd tonic-ui
  ```

2. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

3. Build the MCP package:
  ```bash
  cd packages/mcp
  yarn build
  ```

### Step 1: Create a configuration file

The MCP server requires a configuration file to specify the domains it can access and the documentation packages it serves. The file can be written in either JavaScript (`.js`) or JSON (`.json`) format and must be passed using the `--config` flag.

Example: `tonic-ui-mcp.config.js`
```js
module.exports = {
  packages: [
    {
      name: '@tonic-ui/react',
      version: 'latest',
      llms: '/path/to/tonic-ui/packages/react-docs/pages/llms.txt',
      pageBase: '/path/to/tonic-ui/packages/react-docs/pages/'
    }
  ]
};
```

Configuration options:
* `packages`: An array of documentation packages to serve.
  | Name | Type | Description |
  | :--- | :--- | :---------- |
  | `name` | string | The name of the package (e.g., `@tonic-ui/react`). |
  | `version` | string | The version of the package (e.g., `v2`, `v1`, `latest`). |
  | `llms` | string | An absolute URL or file path to the LLMs documentation file. Must be a valid `file://`, `http://`, or `https://` URL, or a local path. |
  | `pageBase` | string | An absolute URL or file path pointing to the root directory of the documentation pages. Valid values include `file://`, `http://`, or `https://` URLs, or local paths. This is used to substitute `{{BASE_PATH}}` placeholders in the LLMs documentation. |

### Step 2: Configure the MCP server

To integrate the MCP server with Claude Code, create a `.mcp.json` file at the root of your project. For other MCP-compatible clients, refer to their setup instructions.

```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@tonic-ui/mcp",
        "--config",
        "/path/to/tonic-ui/tonic-ui-mcp.config.js"
      ],
      "env": {}
    }
  }
}
```

VS Code requires specific settings to enable MCP functionality:

1. Enable Agent mode (for Copilot Chat)
2. Add the following configuration to your `settings.json`:

```json
{
  "chat.mcp.enabled": true,
  "chat.mcp.discovery.enabled": true
}
```

## Testing with MCP inspector

Use the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) to verify your setup:

1. Install MCP inspector:
  ```bash
  npm install -g @modelcontextprotocol/inspector
  ```

2. Run with entry point:
  ```bash
  mcp-inspector /path/to/tonic-ui/packages/mcp/bin/stdio.js
  ```

3. In the MCP inspector UI, paste the following to the argument field:
  ```bash
  --config /path/to/tonic-ui/tonic-ui-mcp.config.js
  ```

## Supported transports

The MCP server supports multiple transports for connecting clients and servers: stdio, streamable HTTP, and Server-Sent Events (SSE).

### stdio

Configure your client with the stdio transport:

```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@tonic-ui/mcp",
        "--config",
        "/path/to/tonic-ui/tonic-ui-mcp.config.js"
      ]
    }
  }
}
```

### Streamable HTTP

1. Start the server:
```bash
./packages/mcp/tonic-ui-mcp-server --config ./tonic-ui-mcp.config.js
```

2. Open MCP configuration and add a new MCP:
```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "streamable-http",
      "url": "http://127.0.0.1:3000/mcp"
    }
  }
}
```

### Server-Sent Events (SSE)

1. Start the server:
```bash
./packages/mcp/tonic-ui-mcp-server --config ./tonic-ui-mcp.config.js
```

2. Open MCP configuration and add a new MCP:
```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "sse",
      "url": "http://127.0.0.1:3000/sse"
    }
  }
}
```

# @tonic-ui/mcp

A Model Context Protocol (MCP) server for Tonic UI.

## Overview

The Tonic UI MCP server provides structured access to Tonic UI documentation and resources. It enables AI agents and tools to retrieve detailed information about Tonic UI, including:
* Accurate, official documentation
* Up-to-date information directly from the source
* Reliable answers based on authoritative content

Learn more about MCP in the [official MCP documentation](https://modelcontextprotocol.io/introduction).

## Quickstart

### Prerequisites

To get started, first clone the Tonic UI repository by running:
```bash
git clone https://github.com/trendmicro-frontend/tonic-ui.git
```

Be sure to replace the `/path/to/tonic-ui` placeholder with the actual location of your repository when following this guide.

> ⚠️ The current MCP solution for Tonic UI is not a cloud-hosted service. You must clone the repository and run the MCP server locally in order to use it.

### Configure MCP servers in AI coding assistants

For use with the Tonic UI MCP server, the recommended AI coding assistants are **Claude Code** and **Roo Code**.

#### Claude Code

Claude Code supports three different scopes. Choose one based on your requirements:

**Local scope** *(default)*
* Accessible only to you.
```bash
claude mcp add tonic-ui npx -- -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js

# Or explicitly specify local scope
claude mcp add -s local tonic-ui npx -- -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js
```

**Project scope**
* Shared within the team
```bash
claude mcp add -s project tonic-ui npx -- -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js
```

This will generate a `.mcp.json` file similar to the following:
```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@tonic-ui/mcp",
        "--config",
        "/path/to/tonic-ui/tonic-ui-mcp.config.js"
      ]
    }
  }
}
```

**User scope**
* Accessible only to you.
* Usable across all projects.
```bash
claude mcp add -s user tonic-ui npx -- -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js
```

#### Roo Code

Roo Code is an open-source Visual Studio Code extension designed to enhance the coding workflow with AI capabilities.

Once Roo Code is properly configured:
1. Open the "View and More Actions..." dropdown at the top right and choose "MCP Servers"

2. Click **Edit Global MCP** to modify global MCP server settings

Paste the following into your `mcp_settings.json` file:

```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@tonic-ui/mcp",
        "--config",
        "/path/to/tonic-ui/tonic-ui-mcp.config.js"
      ]
    },
  }
}
```

#### GitHub Copilot

For information on configuring the GitHub MCP server, see [Using the GitHub MCP Server](https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol/using-the-github-mcp-server).

1. Add the following configuration to your `.vscode/mcp.json` file:
    ```json
    {
      "servers": {
        "tonic-ui": {
          "type": "stdio",
          "command": "npx",
          "args": [
            "-y",
            "@tonic-ui/mcp",
            "--config",
            "/path/to/tonic-ui/tonic-ui-mcp.config.js"
          ]
        },
      }
    }
    ```

2. Save the `.vscode/mcp.json` file.

3. A "Start" button will appear in your `.vscode/mcp.json` file, at the top of the list of servers. Click the "Start" button to start the MCP servers. This will trigger the input dialog and discover the server tools, which are then stored for later sessions.

4. Open Copilot Chat by clicking the Copilot icon in the title bar of Visual Studio Code.

5. In the Copilot Chat box, select **Agent** from the popup menu.

6. To view your list of available MCP servers, click the gear icon at the top right and choose "MCP Servers". This will display the MCP server list, where you can see all the MCP servers and associated tools that are currently available in your Visual Studio Code instance.

For more information on configuring MCP servers in Visual Studio Code, see [Use MCP servers in Visual Studio Code](https://aka.ms/vscode-add-mcp) in the Visual Studio Code documentation.

---

Visual Studio Code requires specific settings to enable MCP functionality:

1. Enable Agent mode (for Copilot Chat)
2. Add the following configuration to your `settings.json`:
    ```json
    {
      "chat.mcp.enabled": true,
      "chat.mcp.discovery.enabled": true
    }
    ```

## Supported transports

The Tonic UI MCP server supports **stdio**, **Streamable HTTP**, and **Server-Sent Events (SSE)**. The transport can be specified via the `--type` option. For HTTP-based transports, if the designated port is unavailable, the server will automatically bind to the next available port.

### stdio (default)

Run the server with stdio transport (default):
```bash
npx -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js
```

Configuration for stdio transport:
```json
{
  "mcpServers": {
    "tonic-ui": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@tonic-ui/mcp",
        "--config",
        "/path/to/tonic-ui/tonic-ui-mcp.config.js"
      ]
    }
  }
}
```

### Streamable HTTP

Run the server with Streamable HTTP transport:
```bash
npx -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js --type streamable-http --port 3000
```

Configuration for Streamable HTTP transport:
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

Run the server with SSE transport:
```bash
npx -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js --type sse --port 3000
```

Configuration for SSE transport:
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

## Testing with MCP inspector

Use the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) to verify your setup:

1. Install the MCP Inspector globally:
    ```bash
    npm install -g @modelcontextprotocol/inspector
    ```

2. Launch the MCP Inspector:
    ```bash
    mcp-inspector
    ```

3. In the MCP Inspector UI, enter the following values for stdio transport:
   * Transport Type: `STDIO`
   * Command: `npx`
   * Arguments: `-y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js`

## Customize configuration file

The Tonic UI MCP server requires a configuration file to specify the documentation packages it will serve. A sample `tonic-ui-mcp.config.js` file is included in the root directory of the Tonic UI repository.

```js
// tonic-ui-mcp.config.js
module.exports = {
  packages: [
    {
      // The name of the package.
      name: '@tonic-ui/react',

      // The version of the package.
      version: 'v2',

      // An absolute URL or file path to the LLMs documentation file.
      // Must be a valid `file://`, `http://`, or `https://` URL, or a local path.
      llms: '/path/to/tonic-ui/packages/react-docs/pages/llms.txt',

      // An absolute URL or file path pointing to the root directory of the documentation pages.
      // Valid values include `file://`, `http://`, or `https://` URLs, or a local path.
      // This is used to substitute `{{PAGE_BASE}}` placeholders in the LLMs documentation.
      pageBase: '/path/to/tonic-ui/packages/react-docs/pages/',
    }
  ]
};
```

The configuration file can be written in JavaScript (`.js`) or JSON (`.json`) format and must be specified via the `--config` command-line option when running the MCP server:

```bash
npx -y @tonic-ui/mcp --config /path/to/tonic-ui/tonic-ui-mcp.config.js
```

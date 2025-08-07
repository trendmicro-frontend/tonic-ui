# @tonic-ui/mcp

A Model Context Protocol (MCP) server for Tonic UI. It enables AI agents to access detailed information about Tonic UI, including:
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

module.exports = {
  packages: [
    {
      // The name of the package.
      name: '@tonic-ui/react',

      // The version of the package.
      version: 'v2',

      // An absolute URL or file path to the LLMs documentation file.
      // Must be a valid `file://`, `http://`, or `https://` URL, or a local path.
      llms: 'packages/react-docs/pages/llms.txt',

      // An absolute URL or file path pointing to the root directory of the documentation pages.
      // Valid values include `file://`, `http://`, or `https://` URLs, or a local path.
      // This is used to substitute `{{PAGE_BASE}}` placeholders in the LLMs documentation.
      pageBase: 'packages/react-docs/pages/',
    }
  ]
};

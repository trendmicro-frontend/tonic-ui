/**
 * Tonic UI version configuration
 *
 * This file defines the mapping between version labels and their corresponding branches.
 * Add new versions here to automatically update:
 * - Documentation site version selector
 * - Environment variables
 * - CI/CD pipeline
 *
 * Ordered newest-first.
 */
module.exports = {
  versions: [
    {
      branch: 'main',
      label: 'v3',
      prerelease: true,
      tagPrefix: '@tonic-ui/react@3.',  // git tag --list glob prefix (append '*')
    },
    {
      branch: 'v2',
      label: 'v2',
      current: true,                    // drives ci-branch trigger + default highlight
      tagPrefix: '@tonic-ui/react@2.',
    },
    {
      branch: 'v1',
      label: 'v1',
      tagPrefix: '@tonic-ui/react@1.',
    },
  ],
};

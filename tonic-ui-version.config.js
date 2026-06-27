/**
 * Tonic UI version configuration
 *
 * This file defines the mapping between version numbers and their corresponding branches.
 * Add new versions here to automatically update:
 * - Documentation site version selector
 * - Environment variables
 */
module.exports = {
  versions: [
    {
      branch: 'v2',
      label: 'v2',
      stable: true,
    },
    {
      branch: 'v1',
      label: 'v1',
    },
  ],
};

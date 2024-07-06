import changelogFunctions from '@tonic-ui/changelog-github/src';
import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';

jest.mock('@changesets/get-github-info');

describe('changelog-github', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getDependencyReleaseLine', () => {
    it('should return an empty string if no dependencies are updated', async () => {
      const changesets = [];
      const dependenciesUpdated = [];
      const options = { repo: 'org/repo' };

      const result = await changelogFunctions.getDependencyReleaseLine(changesets, dependenciesUpdated, options);

      expect(result).toBe('');
    });

    it('should return a formatted string with updated dependencies', async () => {
      const changesets = [{ commit: 'commit1' }];
      const dependenciesUpdated = [{ name: 'dep1', newVersion: '1.0.1' }];
      const options = { repo: 'org/repo' };

      getInfo.mockResolvedValueOnce({
        links: { commit: 'https://github.com/org/repo/commit/commit1' }
      });

      const result = await changelogFunctions.getDependencyReleaseLine(changesets, dependenciesUpdated, options);

      expect(result).toBe('- Updated dependencies [https://github.com/org/repo/commit/commit1]\n  - dep1@1.0.1');
    });
  });

  describe('getReleaseLine', () => {
    it('should return a formatted string with PR and commit info', async () => {
      const changeset = {
        summary: 'This is a test summary\nPR: #123\nCommit: 75d9ee7\nAuthor: user1',
        commit: 'commit1'
      };
      const options = { repo: 'org/repo' };

      getInfoFromPullRequest.mockResolvedValueOnce({
        links: { pull: 'https://github.com/org/repo/pull/123', user: 'https://github.com/user1' }
      });

      const result = await changelogFunctions.getReleaseLine(changeset, 'minor', options);

      expect(result).toBe('\n\n- This is a test summary by [@user1](https://github.com/user1) in https://github.com/org/repo/pull/123');
    });

    it('should return a formatted string with commit info if no PR is provided', async () => {
      const changeset = {
        summary: 'This is a test summary\nCommit: 75d9ee7\nAuthor: user1',
        commit: 'commit1'
      };
      const options = { repo: 'org/repo' };

      getInfo.mockResolvedValueOnce({
        links: { commit: 'https://github.com/org/repo/commit/75d9ee7', user: 'https://github.com/user1' }
      });

      const result = await changelogFunctions.getReleaseLine(changeset, 'minor', options);

      expect(result).toBe('\n\n- This is a test summary by [@user1](https://github.com/user1) in https://github.com/org/repo/commit/75d9ee7');
    });
  });
});

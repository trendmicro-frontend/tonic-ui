# Contributing

Thank you for your interest in contributing to Tonic UI!

All contributions are welcome. You can submit a pull request on GitHub or raise an issue on GitHub.

## Set Up Documentation Site

Follow these steps to set up the documentation site:

1. Fork the Tonic UI repository.

2. Clone the repository you forked to your local machine:
```bash
git clone https://github.com/<your_github_username>/tonic-ui.git
cd tonic-ui
```

3. Install all dependencies and packages:
```bash
yarn
```

4. Build the source code:
```bash
yarn build
```

5. Start a local development server for the documentation site:
```bash
cd packages/react-docs
yarn dev
```

You can now access the site locally at `http://localhost:3000`. Changes to the docs will be reflected in real-time.

To rebuild React components, navigate to `packages/react` and run:

```bash
cd packages/react
yarn build
```

This will reload the site with the new changes.

## Making a Pull Request

1. Fork the Tonic UI repository and clone your fork.
2. Create a new branch out of the default branch. We suggest using the one of the following conventions for the new branch:
    * `tonic-ui-#`: `#` is the issue number that will be addressed by this PR. For example: `tonic-ui-500`.
    * `type/scope`: `type` can be either `docs`, `fix`, `feat`, `test`, or any other conventional commit type. `scope` is a short identifier that describes the scope of work. For example: `fix/react-checkbox`, `docs/react-color-style`.
    ```bash
    git checkout -b tonic-ui-500
    // or
    git checkout -b docs/react-color-style
    ```
3. Make and commit your changes following the [commit convention](#commit-convention). When you run `git push`, it will trigger `yarn lint` and `yarn test` to ensure everything works as expected. Note that you might need to run `yarn` first to update all dependencies if a new dependency has been added.
    ```bash
    git push --set-upstream origin <your-branch-name>`
    ```
4. Go back to the forked repository and create a pull reqest.

## Commit Convention

### Semantic commit message format

`<type>(<scope>): <subject>`

`<scope>` is optional

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: breaking, build, chore, ci, docs, feat, fix, refactor, style, or test
```

Type    | Description | Release Version
:------ | :---------- | :--------------
`breaking` | Changes that introduce a breaking change to the current release | `major` release
`build` | Changes that affect the build system or external dependencies | `patch` release
`chore` | Other changes that don't modify source or test files | -
`ci` | Changes to CI configuration files and scripts | -
`docs` | Changes to documentation | -
`feat` | New feature for the user, not a new feature for build script | `minor` release
`fix` | Bug fix for the user, not a fix to a build script | `patch` release
`refactor` | A code change that neither fixes a bug nor adds a feature | `minor` release
`style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) | -
`test` | Adding missing tests or correcting existing tests | -

# Contributing Guidelines

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

## Submitting Changes

### Creating a pull request

1. Fork the Tonic UI repository and clone your fork.
2. Create a new branch out of the default branch. We suggest using the one of the following conventions for the new branch:
    * `tonic-ui-#`: `#` is the issue number that will be addressed by this PR. For example: `tonic-ui-500`.
    * `type/scope`: `type` can be either `docs`, `fix`, `feat`, `test`, or any other conventional commit type. `scope` is a short identifier that describes the scope of work. For example: `fix/react-checkbox`, `docs/react-color-style`.
    ```bash
    git checkout -b tonic-ui-500
    // or
    git checkout -b docs/react-color-style
    ```
3. Make and commit your changes following the [Conventional Commits](#conventional-commits). When you run `git push`, it will trigger `yarn lint` and `yarn test` to ensure everything works as expected. Note that you might need to run `yarn` first to update all dependencies if a new dependency has been added.
    ```bash
    git push --set-upstream origin <your-branch-name>
    ```
4. Go back to the forked repository and [create a pull request](https://help.github.com/articles/creating-a-pull-request). The format of the PR title follows [Conventional Commits](#conventional-commits).

### Adding a changeset

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and changelogs management. If you make changes to versioned packages, be sure to add a new changeset to document these updates.

#### When to add a changeset

After making changes, a changeset bot will comment on your pull request (PR) indicating whether you need to add a changeset or confirming that one has already been added. If your changes should result in a version bump, follow the steps below to add a changeset.

![image](https://github.com/trendmicro-frontend/tonic-ui/assets/447801/c11f7e12-5a1b-42be-be27-e7afcc2c1a92)

#### How to add a changeset

> If you are new to changesets, visit the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) to learn about changesets.

The filename for the changeset can be `tonic-ui-#.md`, where `#` is the pull request number:

```
.changeset/
  tonic-ui-<pull_request_number>.md
```

When writing the changeset, it should include the packages being released in the YAML front matter with associated semver bump types, followed by a summary of the changes in markdown.

For example:

```mdx
---
'@tonic-ui/react': minor
'@tonic-ui/react-icons': patch
---

A very helpful description of the changes
```

## Conventional Commits

### Overview

The [Conventional Commits](https://www.conventionalcommits.org) specification is a lightweight convention on top of commit messages.

The commit message should be structured as follows:

```
<type>(optional scope): <description>

[optional body]
[optional footer(s)]
```

The commit contains the following structural elements:

1. **fix:** a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
2. **feat:** a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
3. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. *Types* other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) recommends `build:`, `chore:`, `ci:`, `docs:`, `feat:`, `fix:`, `perf:`, `refactor:`, `revert:`, `style:`, and `test:`.
5. *Footers* other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to git trailer format.

Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

### Commit Types

The table below summarizes the different commit types, descriptions, and the corresponding impact on the release version. This helps in understanding how each type of change affects the codebase and versioning:

Type    | Description | Release Version
:------ | :---------- | :--------------
`build` | Changes that affect the build system or external dependencies | `patch` release
`chore` | Other changes that don't modify source or test files | -
`ci` | Changes to CI configuration files and scripts | -
`docs` | Changes to documentation | -
`feat` | New feature for the user, not a new feature for build script | `minor` release
`fix` | Bug fix for the user, not a fix to a build script | `patch` release
`perf` | A code change that improves performance	| `patch` release
`refactor` | A code change that neither fixes a bug nor adds a feature | `minor` release
`revert` | Reverts a previous commit | -
`style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) | -
`test` | Adding missing tests or correcting existing tests | -

### Examples

#### Commit message

```
docs: correct spelling of CHANGELOG
```

#### Commit message with scope

```
feat(react/box): add ability to support the `sx` prop
```

#### Commit message with `!` to draw attention to breaking change

```
feat!: change default button color

BREAKING CHANGE: The default button color has been changed from blue to gray.
```

#### Commit message with scope and `!` to draw attention to breaking change

```
feat(react/badge)!: deprecate `variantColor` prop

BREAKING CHANGE: The `variantColor` prop has been removed. Use the `color` prop instead.
```

#### Commit message with multi-paragraph body and multiple footers

```
feat(react/menu): add support for submenus

Add the ability to create submenus within the main menu component.
Updated the documentation to reflect the new submenu functionality.
Added tests to ensure that submenus are rendered correctly and interact as expected.

Reviewed-by: A
Reviewed-by: B
Refs: #456
```

```
fix(react/table): correct column alignment issue

Fixed a bug where columns were not aligned properly when the table had a fixed layout.
Adjusted the CSS to ensure that columns align correctly in all supported browsers.
Added regression tests to prevent this issue from occurring in the future.

Reviewed-by: C
Refs: #789
```

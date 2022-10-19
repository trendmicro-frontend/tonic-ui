# Contributing

Thank you for your interest in contributing to this project.

All contributions are welcome. You can submit a pull request on GitHub or raise an issue on GitHub.

Please note that the project is in an early stage and the API is subject to change. We expect to have a stable API in the near future.

## Perequisites

* Use Node.js 14 at least to build the project.
* Run `yarn set version stable` to ensure you are using the latest stable version of Yarn.

## Getting Started

* Fork the Tonic UI repository on GitHub.
* Clone your fork to your local machine: `git clone git@github.com:<yourname>/tonic-ui.git`
* Create a new branch from the `master` on your fork: `git checkout -b <your-branch-name>`
* Run `yarn install` and `yarn build` to build the source code.
* Make your changes and then push to the new branch: `git push --set-upstream origin <your-branch-name>`
* Visit GitHub and create a pull request.

## Contributing to Documentation

To contribute the documentation, you can run a local server with `yarn dev` in the `packages/docs` directory. Be sure to run `yarn build` in advance before running the server.

```bash
# Build the workspace
yarn build
```

```bash
# Run the server
cd packages/docs
yarn dev
```

You can now access the site locally at `http://localhost:3000`. Changes to the docs will be reflected in the build.

To update React components, go to `packages/react` and run `yarn build`, it will reload the site with the new changes.

```bash
# Update React components
cd packages/react
yarn build
```

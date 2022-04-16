# @tonic-ui/react-lab

This package hosts the incubator components that are not yet ready to move to the core.

The main difference between the lab and the core is how the components are versioned. Having a separate lab package allows us to keep the core stable while the lab is evolving with breaking changes.

For a component to be ready to move to the core, the following conditions are considered:

* The component is stable and ready to be used in production.
* It can be used in the core without introducing new external dependencies.
* No breaking changes will happen in the near future.

## Installation

```sh
// with npm
npm install @tonic-ui/react-lab

// with yarn
yarn add @tonic-ui/react-lab
```

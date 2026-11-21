/** @template {string} Name @typedef {import('./createBreakpoints').Breakpoints<Name>} Breakpoints */
/** @template {string} Name @typedef {Pick<Breakpoints<Name>, 'gte' | 'lt' | 'between' | 'only'>} ContainerQueryMethods */
/** @template {string} Name @typedef {((name: string) => ContainerQueryMethods<Name>) & ContainerQueryMethods<Name>} ContainerQueries */

/** @template {string} Name @param {Breakpoints<Name>} breakpoints @returns {ContainerQueries<Name>} */
export function createContainerQueries(breakpoints) {
  /** @param {string} [name] @returns {ContainerQueryMethods<Name>} */
  function forContainer(name) {
    const prefix = name ? `@container ${name}` : '@container';
    return {
      gte: (key) => prefix + breakpoints.gte(key).slice('@media'.length),
      lt: (key) => prefix + breakpoints.lt(key).slice('@media'.length),
      between: (start, end) => prefix + breakpoints.between(start, end).slice('@media'.length),
      only: (key) => prefix + breakpoints.only(key).slice('@media'.length),
    };
  }

  return Object.assign(forContainer, forContainer());
}

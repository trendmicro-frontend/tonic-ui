/** @typedef {ReturnType<typeof import('./createBreakpoints').createBreakpoints>} Breakpoints */
/** @typedef {Pick<Breakpoints, 'gte' | 'lt' | 'between' | 'only'>} ContainerQueryMethods */
/** @typedef {((name: string) => ContainerQueryMethods) & ContainerQueryMethods} ContainerQueries */

/** @param {Breakpoints} breakpoints @returns {ContainerQueries} */
export function createContainerQueries(breakpoints) {
  /** @param {string} [name] @returns {ContainerQueryMethods} */
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

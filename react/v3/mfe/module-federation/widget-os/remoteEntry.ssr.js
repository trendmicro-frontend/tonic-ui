
  import { init as runtimeInit } from "@module-federation/runtime";

  let exposesMapPromise;

  async function getExposesMap() {
    exposesMapPromise ??= import("virtual:mf-exposes-ssr:__mfe_internal__widget_os__remoteEntry_js").then((mod) => mod.default ?? mod);
    return exposesMapPromise;
  }

  /**
   * Called by the MF runtime on the host to register this remote's share scope.
   * On the server the host has already initialised the runtime, so we just need
   * to set up a minimal runtime instance for the remote container.
   */
  async function init(shared = {}, initScope = []) {
    const initRes = runtimeInit({
      name: "widget_os",
      remotes: [],
      shared: {},
    });
    const initToken = { from: "widget_os" };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    initRes.initShareScopeMap("default", shared);
    try {
      await Promise.all(
        await initRes.initializeSharing("default", {
          strategy: "version-first",
          from: 'build',
          initScope,
        })
      );
    } catch (e) {
      console.error('[Module Federation SSR]', e);
    }
    return initRes;
  }

  async function getExposes(moduleName) {
    const exposesMap = await getExposesMap();
    if (!(moduleName in exposesMap))
      throw new Error(`[Module Federation] Module ${moduleName} does not exist in container.`);
    return exposesMap[moduleName]().then((res) => () => res);
  }

  export { init, getExposes as get };
  
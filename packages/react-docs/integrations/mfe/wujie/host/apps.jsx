/* global __BASE_PATH__ */
import WujieReact from 'wujie-react';
import useMicroAppLifecycle from './useMicroAppLifecycle';

// Explicit index.html (not a trailing-slash dir): Next.js serving public/ does not
// resolve a trailing-slash directory to index.html (404), unlike a plain static server.
const SUB_APP_URL = {
  widgetUpdates: `${window.location.origin}${__BASE_PATH__}/mfe/wujie/apps/widget-updates/index.html`,
  widgetOS: `${window.location.origin}${__BASE_PATH__}/mfe/wujie/apps/widget-os/index.html`,
  inventory: `${window.location.origin}${__BASE_PATH__}/mfe/wujie/apps/inventory/index.html`,
};

// Shared WujieReact wrapper
function BaseApp({ name, url, props }) {
  return (
    <WujieReact
      name={name}
      url={url}
      width="100%"
      height="100%"

      // Enables route synchronization between the sub-app and the host app.
      // true  - Syncs the sub-app route with the host URL.
      // false - Keeps the sub-app route isolated from the host URL.
      sync={false}

      // Enables iframe fallback mode for browsers that do not support Wujie's sandboxing features.
      // true  - Uses iframe mode instead of sandbox + shadow DOM isolation.
      // false - Keeps Wujie's sandbox + shadow DOM isolation.
      degrade={false}

      // Pass data to the sub-app via `window.$wujie.props`.
      // Changes are not reactive; the sub-app reads the value on (re)mount.
      props={props}
    />
  );
}

export function WidgetUpdates(props) {
  useMicroAppLifecycle('widget-updates', { destroyOnUnmount: false });

  return (
    <BaseApp
      name="widget-updates"
      url={SUB_APP_URL.widgetUpdates}
      props={props}
    />
  );
}

export function WidgetOS(props) {
  useMicroAppLifecycle('widget-os', { destroyOnUnmount: false });

  return (
    <BaseApp
      name="widget-os"
      url={SUB_APP_URL.widgetOS}
      props={props}
    />
  );
}

export function InventoryView(props) {
  // Destroy the inventory sub-app on unmount so its shadow DOM is torn down rather
  // than kept alive. The inventory grid injects a global `col-resize` cursor style
  // during a column-resize drag; if navigation unmounts the grid mid-drag, the
  // resize never ends and the style would otherwise be orphaned in Wujie's reused
  // shadow head and accumulate across remounts. Destroying the app discards that
  // shadow root entirely, so the leaked style goes with it.
  useMicroAppLifecycle('inventory', { destroyOnUnmount: true });

  return (
    <BaseApp
      name="inventory"
      url={SUB_APP_URL.inventory}
      props={props}
    />
  );
}

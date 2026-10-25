import { expect } from '@playwright/test';

export const visit = async (page, component, options = {}) => {
  const query = new URLSearchParams({ component, ...options });
  await page.goto(`?${query}`);
  const scope = options.environment === 'iframe' ? page.frameLocator('iframe') : page;
  await expect(scope.getByTestId('events')).toBeVisible();
  return scope;
};

export const events = async (scope, type) => {
  const entries = JSON.parse(await scope.getByTestId('events').textContent());
  return type ? entries.filter(entry => entry.type === type) : entries;
};

// Menu and click-triggered Popover move focus after opening in an animation frame.
export const open = async (scope) => {
  await scope.getByTestId('trigger').click();
  await expect(scope.getByTestId('content')).toBeVisible();
  await expect(scope.getByTestId('content')).toBeFocused();
};

const probedPages = new WeakSet();

// Callback logs only show whether a component still reacts after unmount. This
// init script records the document-level `mousedown`/`touchstart` registrations
// themselves so lifecycle tests can assert the subscriptions are gone. React
// delegates synthetic events to its root container, so unrelated listeners are
// not counted.
export const installListenerProbe = async (page) => {
  if (probedPages.has(page)) {
    return;
  }
  probedPages.add(page);

  await page.addInitScript(() => {
    // The top document owns the registry. Same-origin iframe documents are
    // instrumented when the iframe element is inserted, before the component
    // can subscribe to them.
    if (window !== window.top || window.__documentListenerProbe) {
      return;
    }

    const trackedTypes = ['mousedown', 'touchstart'];
    const listenerIds = new WeakMap();
    const documentIds = new WeakMap();
    const entries = [];
    let nextListenerId = 1;
    let nextDocumentId = 1;

    const getListenerId = (listener) => {
      if (!listener || (typeof listener !== 'function' && typeof listener !== 'object')) {
        return null;
      }
      let id = listenerIds.get(listener);
      if (id === undefined) {
        id = nextListenerId++;
        listenerIds.set(listener, id);
      }
      return id;
    };

    const getDocumentId = (doc) => {
      let id = documentIds.get(doc);
      if (id === undefined) {
        id = nextDocumentId++;
        documentIds.set(doc, id);
      }
      return id;
    };

    const normalizeCapture = options => (typeof options === 'boolean' ? options : Boolean(options && options.capture));

    const findActive = (doc, type, capture, listenerId) => entries.find(entry => (
      entry.active &&
      entry.documentId === getDocumentId(doc) &&
      entry.type === type &&
      entry.capture === capture &&
      entry.listenerId === listenerId
    ));

    const install = (realm) => {
      const eventTargetPrototype = realm && realm.EventTarget && realm.EventTarget.prototype;
      if (!eventTargetPrototype || eventTargetPrototype.__tonicDocumentListenerProbe) {
        return;
      }
      Object.defineProperty(eventTargetPrototype, '__tonicDocumentListenerProbe', {
        value: true,
        configurable: true,
      });

      const nativeAddEventListener = eventTargetPrototype.addEventListener;
      const nativeRemoveEventListener = eventTargetPrototype.removeEventListener;

      eventTargetPrototype.addEventListener = function addEventListener(type, listener, options) {
        if (this && this.nodeType === 9 && trackedTypes.includes(type)) {
          const listenerId = getListenerId(listener);
          const capture = normalizeCapture(options);
          // The platform ignores a duplicate registration with the same
          // identity, type, and capture flag, so do not record it twice.
          if (listenerId !== null && !findActive(this, type, capture, listenerId)) {
            entries.push({
              active: true,
              capture,
              documentId: getDocumentId(this),
              isTop: this === window.document,
              listenerId,
              type,
            });
          }
        }
        return nativeAddEventListener.call(this, type, listener, options);
      };

      eventTargetPrototype.removeEventListener = function removeEventListener(type, listener, options) {
        if (this && this.nodeType === 9 && trackedTypes.includes(type)) {
          const listenerId = getListenerId(listener);
          const entry = listenerId === null ? null : findActive(this, type, normalizeCapture(options), listenerId);
          if (entry) {
            entry.active = false;
          }
        }
        return nativeRemoveEventListener.call(this, type, listener, options);
      };
    };

    const patchFrame = (frame) => {
      try {
        install(frame.contentWindow);
      } catch {
        // Cross-origin frames keep their own document listeners.
      }
    };

    const patchInsertedNode = (node) => {
      if (!node) {
        return;
      }
      if (node.nodeType === 1) {
        if (node.nodeName === 'IFRAME') {
          patchFrame(node);
        }
        return;
      }
      if (node.nodeType === 11 && node.querySelectorAll) {
        node.querySelectorAll('iframe').forEach(patchFrame);
      }
    };

    install(window);
    document.querySelectorAll('iframe').forEach(patchFrame);

    ['appendChild', 'insertBefore', 'replaceChild'].forEach((method) => {
      const nativeInsertion = Node.prototype[method];
      if (typeof nativeInsertion !== 'function') {
        return;
      }
      Node.prototype[method] = function instrumentedInsertion(node, ...rest) {
        const result = nativeInsertion.call(this, node, ...rest);
        patchInsertedNode(node);
        return result;
      };
    });

    window.__documentListenerProbe = {
      snapshot: () => ({
        active: entries
          .filter(entry => entry.active)
          .map(entry => ({
            capture: entry.capture,
            isTop: entry.isTop,
            type: entry.type,
          })),
      }),
    };
  });
};

// Current document listeners. Call `installListenerProbe(page)` before `visit`
// so registrations are observed from the moment the page starts.
export const documentListeners = (page) => page.evaluate(() => {
  const probe = window.__documentListenerProbe;
  return probe ? probe.snapshot() : { active: [] };
});

// Summary used by lifecycle assertions: which event types are subscribed, in
// which phase, and in which document realm. Sets make it insensitive to the
// registration order and to duplicate registrations the platform ignores.
export const describeDocumentListeners = (snapshot) => ({
  captures: [...new Set(snapshot.active.map(entry => entry.capture))],
  isTop: [...new Set(snapshot.active.map(entry => entry.isTop))],
  types: [...new Set(snapshot.active.map(entry => entry.type))].sort(),
});

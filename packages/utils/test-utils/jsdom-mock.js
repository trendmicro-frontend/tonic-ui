const createMockElement = (elementName = 'div', style = {}) => {
  const el = document.createElement(elementName);

  Object.assign(el.style, {
    ...style,
    width: (parseFloat(style?.width) || 0) + 'px',
    height: (parseFloat(style?.height) || 0) + 'px',
  });

  // Mock this for jsdom
  el.getBoundingClientRect = () => ({
    width: parseFloat(style?.width) || 0,
    height: parseFloat(style?.height) || 0,
    top: parseFloat(style?.marginTop) || 0,
    left: parseFloat(style?.marginLeft) || 0,
  });

  Object.defineProperties(el, {
    offsetWidth: {
      get() {
        return parseFloat(style?.width) || 0;
      },
    },
    offsetHeight: {
      get() {
        return parseFloat(style?.height) || 0;
      },
    },
    offsetTop: {
      get() {
        return parseFloat(style?.marginTop) || 0;
      },
    },
    offsetLeft: {
      get() {
        return parseFloat(style?.marginLeft) || 0;
      },
    },
    // https://github.com/jsdom/jsdom/issues/1261#issuecomment-362928131
    offsetParent: {
      get() {
        for (let element = this; element; element = element.parentNode) {
          if (element.style?.display?.toLowerCase() === 'none') {
            return null;
          }
        }

        if (this.stye?.position?.toLowerCase() === 'fixed') {
          return null;
        }

        if (this.tagName.toLowerCase() in ['html', 'body']) {
          return null;
        }

        return this.parentNode;
      },
    },
  });

  return el;
};

export {
  createMockElement,
};

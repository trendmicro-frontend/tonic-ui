// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const DOCUMENT_NODE = 9;

const getWindow = (node) => {
  if (node === node?.window) {
    return node;
  }

  return node?.nodeType === DOCUMENT_NODE ? node?.defaultView || node?.parentWindow : null;
};

export default getWindow;

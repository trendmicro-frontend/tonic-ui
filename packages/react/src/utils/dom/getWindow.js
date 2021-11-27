const getWindow = (node) => {
  if (node === node?.window) {
    return node;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  // The node type 9 is a `Document` node
  return node?.nodeType === 9 ? node?.defaultView || node?.parentWindow : null;
};

export default getWindow;

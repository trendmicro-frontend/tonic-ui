import ownerDocument from './ownerDocument';

const ownerWindow = (node) => {
  const doc = ownerDocument(node);
  return doc?.defaultView;
};

export default ownerWindow;

export const findExpandableNodeIds = (tree) => {
  const expandableNodeIds = [];

  const traverse = (node) => {
    if (Array.isArray(node.children) && node.children.length > 0) {
      expandableNodeIds.push(node.id);
      node.children.forEach(traverse);
    }
  };

  traverse(tree);

  return expandableNodeIds;
};

export const getAllNodeIds = (tree) => {
  const allNodeIds = [];

  const traverse = (node) => {
    allNodeIds.push(node.id);
    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  };

  traverse(tree);

  return allNodeIds;
};

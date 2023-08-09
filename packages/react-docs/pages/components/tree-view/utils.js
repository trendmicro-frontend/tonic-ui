export const buildTreeMap = (tree) => {
  const treeMap = new Map();

  const traverse = (node) => {
    treeMap.set(node.id, node);
    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  };

  traverse(tree);

  return treeMap;
};

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

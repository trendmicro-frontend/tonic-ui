import { ensureArray } from 'ensure-type';

export const buildTreeMap = (nodes) => {
  const treeMap = new Map();

  const traverse = (nodes) => {
    ensureArray(nodes).forEach((node) => {
      treeMap.set(node.id, node);
      traverse(node.children);
    });
  };

  traverse(nodes);

  return treeMap;
};

export const findExpandableNodeIds = (nodes) => {
  const expandableNodeIds = [];

  const traverse = (nodes) => {
    ensureArray(nodes).forEach((node) => {
      expandableNodeIds.push(node.id);
      traverse(node.children);
    });
  };

  traverse(nodes);

  return expandableNodeIds;
};

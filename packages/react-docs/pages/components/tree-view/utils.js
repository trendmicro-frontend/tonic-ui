import { ensureArray } from 'ensure-type';
import defaultTreeNodes from './data/tree-nodes.json';

export const buildTreeNodes = () => {
  return JSON.parse(JSON.stringify(defaultTreeNodes));
};

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
      if (Array.isArray(node.children) && node.children.length > 0) {
        expandableNodeIds.push(node.id);
        traverse(node.children);
      }
    });
  };

  traverse(nodes);

  return expandableNodeIds;
};

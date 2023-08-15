const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomTreeNodes = ({
  rootNodeCount = 0,
  maxChildNodes = 0,
  maxDepth = 1,
  minDepth = 1,
  maxNodeCount = 0,
}) => {
  let nodeCounter = 0;

  const traverse = ({ nodeCount = 0, currentDepth = 1, parentId = 0 }) => {
    if (nodeCounter >= maxNodeCount) {
      return [];
    }

    const nodes = [];
    for (let i = 1; i <= nodeCount && nodeCounter < maxNodeCount; i++) {
      ++nodeCounter;

      const nodeId = (parentId === 0 ? i : `${parentId}.${i}`);
      const nodeName = `Node ${nodeCounter}`;
      const randomNodeDepth = generateRandomNumber(minDepth, maxDepth);
      const children = (currentDepth < randomNodeDepth) && (nodeCounter < maxNodeCount)
        ? traverse({ nodeCount: generateRandomNumber(1, maxChildNodes), currentDepth: currentDepth + 1, parentId: nodeId })
        : undefined;

      nodes.push({
        id: nodeId,
        name: nodeName,
        children,
      });
    }

    return nodes;
  };

  return traverse({ nodeCount: rootNodeCount });
}

// Define the number of root nodes and the maximum depth of the tree
const options = {
  rootNodeCount: 20,
  maxChildNodes: 5,
  maxDepth: 4,
  minDepth: 2,
  maxNodeCount: 100,
};
const generatedTree = generateRandomTreeNodes(options);

console.log(JSON.stringify(generatedTree, null, 2));

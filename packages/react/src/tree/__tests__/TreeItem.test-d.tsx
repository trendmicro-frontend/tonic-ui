import React, { createRef } from 'react';
import { TreeItem, TreeItemContent, TreeItemToggle } from '@tonic-ui/react';

// Basic usage (render is required)
<TreeItem
  nodeId="node-1"
  render={() => <TreeItemContent>Item</TreeItemContent>}
/>;

// With disabled
<TreeItem
  nodeId="node-1"
  disabled
  render={() => <TreeItemContent>Disabled Item</TreeItemContent>}
/>;

// With render prop context (no manual type annotation)
<TreeItem
  nodeId="folder-1"
  render={({ isExpanded, isSelected, isDisabled, nodeId, nodeDepth, toggleExpansion }) => (
    <>
      <TreeItemToggle />
      <TreeItemContent>Documents ({nodeId})</TreeItemContent>
    </>
  )}
>
  <TreeItem
    nodeId="file-1"
    render={() => <TreeItemContent>Report.pdf</TreeItemContent>}
  />
</TreeItem>;

// With TransitionProps
<TreeItem
  nodeId="node-1"
  TransitionProps={{ timeout: 300 }}
  render={() => <TreeItemContent>Item</TreeItemContent>}
/>;

<TreeItem
  nodeId="node-1"
  TransitionProps={{ timeout: { enter: 300, exit: 200 }, appear: true }}
  render={() => <TreeItemContent>Item</TreeItemContent>}
/>;

// Ref
const treeItemRef = createRef<HTMLDivElement>();
<TreeItem
  ref={treeItemRef}
  nodeId="1"
  render={() => <TreeItemContent>Item</TreeItemContent>}
/>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
<TreeItem
  // @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
  ref={wrongRef}
  nodeId="1"
  render={() => <TreeItemContent>Item</TreeItemContent>}
/>;

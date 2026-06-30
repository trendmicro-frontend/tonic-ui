import React, { createRef } from 'react';
import { Tree, TreeItem, TreeItemContent } from '@tonic-ui/react';

// Basic usage
<Tree>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With isSelectable
<Tree isSelectable>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With isUnselectable
<Tree isUnselectable>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With multiSelect
<Tree multiSelect>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With defaultExpanded
<Tree defaultExpanded={['1', '2']}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With defaultSelected
<Tree defaultSelected={['1']}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// Controlled with expanded and onNodeToggle (no manual type annotation)
<Tree expanded={['1']} onNodeToggle={(nodeIds) => console.log(nodeIds)}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// Controlled with selected and onNodeSelect (no manual type annotation)
<Tree selected={['1']} onNodeSelect={(nodeIds) => console.log(nodeIds)}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// With onNodeFocus (no manual type annotation)
<Tree onNodeFocus={(nodeId) => console.log(nodeId)}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item 1</TreeItemContent>}
  />
</Tree>;

// StyleProps
<Tree padding="4x">
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item</TreeItemContent>}
  />
</Tree>;

// Ref
const treeRef = createRef<HTMLDivElement>();
<Tree ref={treeRef}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item</TreeItemContent>}
  />
</Tree>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Tree ref={wrongRef}>
  <TreeItem
    nodeId="1"
    render={() => <TreeItemContent>Item</TreeItemContent>}
  />
</Tree>;

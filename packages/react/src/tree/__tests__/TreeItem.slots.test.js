import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  Tree,
  TreeItem,
  TreeItemContent,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
));
CustomTransition.displayName = 'CustomTransition';

const SimpleTreeItem = ({ treeItemProps = {} }) => (
  <Tree defaultExpanded={['parent']}>
    <TreeItem
      nodeId="parent"
      render={() => <TreeItemContent>Parent Node</TreeItemContent>}
      {...treeItemProps}
    >
      <TreeItem
        nodeId="child"
        render={() => <TreeItemContent>Child Node</TreeItemContent>}
      />
    </TreeItem>
  </Tree>
);

describe('TreeItem slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', () => {
    render(
      <SimpleTreeItem
        treeItemProps={{ slots: { transition: CustomTransition } }}
      />
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    render(
      <SimpleTreeItem
        treeItemProps={{
          slots: { transition: CustomTransition },
          slotProps: { transition: { 'data-foo': 'bar' } },
        }}
      />
    );

    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    render(
      <SimpleTreeItem
        treeItemProps={{
          TransitionComponent: CustomTransition,
          TransitionProps: {},
        }}
      />
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'TreeItem:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'TreeItem:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});

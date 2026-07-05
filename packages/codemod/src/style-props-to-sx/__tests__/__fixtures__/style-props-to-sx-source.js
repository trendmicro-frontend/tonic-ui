import { Button, Flex, Scrollbar } from '@tonic-ui/react';
import { AddIcon } from '@tonic-ui/react-icons';
import LocalCard from '../../../components/LocalCard';
import React from 'react';

const LocalHelper = ({ width }) => <div>{width}</div>;

export default ({ buttonProps, dynamicSx, internalSx }) => (
  <Flex direction="column" rowGap="4x" p="4x">
    {/* No existing sx, multiple flat style props -> new sx={{ ... }} */}
    <Button variant="primary" width="8x" height="8x" borderRadius="circle">
      Save
    </Button>

    {/* Existing sx as a plain object literal -> merge in */}
    <Button
      variant="secondary"
      color="text.secondary"
      sx={{
        cursor: 'pointer',
      }}
    >
      Cancel
    </Button>

    {/* Pseudo prop with a JSXExpressionContainer object value */}
    <Button variant="ghost" _hover={{ backgroundColor: 'actions.hovered' }}>
      Ghost
    </Button>

    {/* Existing sx that is NOT a plain object literal (a variable) -> left
        untouched, flagged for manual review, no guessed merge */}
    <Button variant="primary" width="4x" sx={dynamicSx}>
      Dynamic
    </Button>

    {/* Layer-2 protected prop (Scrollbar reads width/height directly for
        scroll-threshold math) -> left untouched, flagged for manual review */}
    <Scrollbar height="200px" overflowY="auto">
      Content
    </Scrollbar>

    {/* Layer-1 exempt component (Flex's own flat props ARE its API) -> never touched */}
    <Flex columnGap="2x" alignItems="center">
      <AddIcon color="text.secondary" />
    </Flex>

    {/* A spread attribute mixed with a real style prop -- must not be
        mistaken for a style prop, and must stay in place */}
    <Button label="Info" {...buttonProps} width="20x" px="2x">
      <AddIcon />
    </Button>

    {/* __sx must never be touched, even though it looks like a style channel */}
    <Button variant="primary" __sx={internalSx} width="6x">
      Internal
    </Button>

    {/* A component not imported from @tonic-ui/react(-icons) -- must be left alone
        even though `width` is a real style prop name */}
    <LocalCard width="8x" />
    <LocalHelper width="8x" />
  </Flex>
);

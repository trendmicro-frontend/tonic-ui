import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  LinkButton,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { useCallback, useEffect, useReducer } from 'react';
import { List, arrayMove } from 'react-movable';
import HandleIcon from './icon-handle';

const UPDATE_COLUMNS = 'UPDATE_COLUMNS';

const reducer = (state, action) => {
  if (action.type === UPDATE_COLUMNS) {
    const nextState = {
      ...state,
      columns: ensureArray(action.payload),
    };
    return nextState;
  }

  return state;
};

/**
 * columns = [
 *   {
 *     id: <string>,
 *     label: <string>,
 *     isPinned: <boolean>,
 *     isVisible: <boolean>,
 *   }
 * ]
 */
const ColumnSettingsDrawer = ({
  columns: columnsProp,
  onUpdateColumns,
  isOpen,
  onClose,
}) => {
  const [colorStyle] = useColorStyle();
  const [state, dispatch] = useReducer(reducer, {
    columns: ensureArray(columnsProp),
  });
  const allColumnsVisible = state.columns.every(column => column.isVisible !== false);
  const isToggleAllChecked = allColumnsVisible;
  const toggleAllColumns = useCallback(() => {
    const isVisible = !allColumnsVisible;
    dispatch({
      type: UPDATE_COLUMNS,
      payload: state.columns.map(column => {
        if (column.isPinned) {
          return column;
        }
        return {
          ...column,
          isVisible: isVisible,
        };
      }),
    });
  }, [allColumnsVisible, state.columns]);

  useEffect(() => {
    const nextColumns = columnsProp;
    dispatch({
      type: UPDATE_COLUMNS,
      payload: nextColumns,
    });
  }, [columnsProp]);

  const handleClickResetToDefault = useCallback(() => {
    dispatch({
      type: UPDATE_COLUMNS,
      payload: columnsProp,
    });
  }, [columnsProp]);

  const handleUpdateColumns = useCallback(() => {
    ensureFunction(onUpdateColumns)(state.columns);
    ensureFunction(onClose)();
  }, [onClose, onUpdateColumns, state.columns]);

  return (
    <Drawer
      autoFocus={true}
      backdrop={true}
      closeOnEsc={true}
      closeOnOutsideClick={true}
      returnFocusOnClose={false}
      ensureFocus={true}
      isClosable={true}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Show/Hide Columns
        </DrawerHeader>
        <DrawerBody>
          <Box mb="1x">
            <Button
              variant="secondary"
              onClick={handleClickResetToDefault}
            >
              Reset to Default
            </Button>
          </Box>
          <Box mb="1x">
            <LinkButton onClick={toggleAllColumns}>
              {isToggleAllChecked ? 'Clear all' : 'Select all'}
            </LinkButton>
          </Box>
            <List
              lockVertically={true}
              values={state.columns.map(column => ({
                ...column,
                // Set disabled to true if the column is pinned
                disabled: !!column.isPinned,
              }))}
              onChange={({ oldIndex, newIndex }) => {
                dispatch({
                  type: UPDATE_COLUMNS,
                  payload: arrayMove(state.columns, oldIndex, newIndex),
                });
              }}
              renderList={({ children, props }) => (
                <Box {...props}>
                  {children}
                </Box>
              )}
              renderItem={({ value: column, index, isDragged, isSelected, isOutOfBounds, props }) => {
                const isPinned = !!column.isPinned;
                const isVisible = column.isVisible !== false;
                const hoverBackgroundColor = (() => {
                  if (isPinned) {
                    return;
                  }
                  if (isDragged) {
                    return 'gray:70';
                  }
                  return colorStyle.background.highlighted;
                })()
                // Cursor for the draggable element
                const cursor = (() => {
                  if (isOutOfBounds) {
                    return 'not-allowed';
                  }
                  if (isPinned) {
                    return;
                  }
                  if (isDragged) {
                    return 'grabbing';
                  }
                  return 'grab';
                })();
                // Ensure the draggable element appears on top of other elements when dragged
                const zIndex = isDragged ? 'modal' : undefined;

                return (
                  <Flex
                    {...props}
                    sx={{
                      border: 1,
                      borderColor: isDragged ? 'gray:60' : 'transparent',
                      alignItems: 'center',
                      mb: '1x',
                      width: '100%',
                      cursor,
                      zIndex,
                      ':hover': {
                        backgroundColor: hoverBackgroundColor,
                      },
                    }}
                  >
                    <Flex
                      // Mark any node with the `data-movable-handle` attribute if you wish you wish to use it as a DnD handle.
                      // The rest of renderItem will be then ignored and not start the drag and drop.
                      //data-movable-handle
                      tabIndex={-1}
                      sx={{
                        '*:hover > &': {
                          visibility: 'visible',
                        },
                        visibility: 'hidden',
                        //cursor: isDragged ? 'grabbing' : 'grab',
                        px: '1x',
                        minWidth: '4x',
                      }}
                    >
                      {!isPinned ? <HandleIcon /> : null}
                    </Flex>
                    <Checkbox
                      // The "role" attribute must be included for "react-movable" to verify the interactivity of the element
                      // https://github.com/tajo/react-movable/blob/master/src/utils.ts
                      role="checkbox"
                      disabled={isPinned}
                      checked={isVisible}
                      onChange={(event) => {
                        const isVisible = event.target.checked;
                        const nextColumns = state.columns.map(_column => {
                          if (_column.id !== column.id) {
                            return _column;
                          } 
                          return {
                            ..._column,
                            isVisible,
                          };
                        });
                        dispatch({
                          type: UPDATE_COLUMNS,
                          payload: nextColumns,
                        });
                      }}
                    >
                      {column.label}
                    </Checkbox>
                  </Flex>
                );
              }}
            />
        </DrawerBody>
        <DrawerFooter>
          <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
            <Button
              variant="primary"
              onClick={handleUpdateColumns}
            >
              Save
            </Button>
            <Button
              variant="default"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ColumnSettingsDrawer;

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
import _orderBy from 'lodash/orderBy';
import React, { useCallback, useEffect, useReducer } from 'react';
import { List, arrayMove } from 'react-movable';
import HandleIcon from '../icons/icon-handle';

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
 * @param {object} columns - The columns to be displayed in the drawer
 * @param {string} columns[].id - The id of the column
 * @param {string} columns[].label - The label of the column
 * @param {boolean} columns[].isPinned - Whether the column is pinned
 * @param {boolean} columns[].isVisible - Whether the column is visible
 * @param {string[]} defaultColumnOrder - The default order of the columns
 * @param {function} onUpdateColumns - Callback function to be called when the columns are updated
 * @param {boolean} isOpen - Whether the drawer is open
 * @param {function} onClose - Callback function to be called when the drawer is closed
 */
const ColumnSettingsDrawer = ({
  columns: columnsProp,
  defaultColumnOrder: defaultColumnOrder,
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
    const nextColumns = _orderBy(state.columns, (column) => defaultColumnOrder.indexOf(column.id), ['asc']);
    dispatch({
      type: UPDATE_COLUMNS,
      payload: nextColumns,
    });
  }, [defaultColumnOrder, state.columns]);

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
                  return isDragged ? 'move' : 'move';
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

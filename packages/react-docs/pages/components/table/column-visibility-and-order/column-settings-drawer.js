import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  LinkButton,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { isNullish } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import _isEqual from 'lodash/isEqual';
import _orderBy from 'lodash/orderBy';
import React, {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
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

const DragHandle = forwardRef((props, ref) => {
  return (
    <Flex
      role="presentation"
      sx={{
        alignItems: 'center',
        cursor: 'move',
      }}
      {...props}
    />
  );
});
DragHandle.displayName = 'DragHandle';

const SortableOverlay = ({ children }) => {
  const dropAnimationConfig = useMemo(() => ({
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  }), []);

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      {children}
    </DragOverlay>
  );
};

const SortableItem = ({ children, id }) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({ id });
  return children({ attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition });
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
    const nextColumns = _orderBy(state.columns, (column) => defaultColumnOrder.indexOf(column.id), ['asc'])
      .map(column => {
        const isVisible = defaultColumnOrder.indexOf(column.id) >= 0;
        column.isVisible = isVisible;
        return column;
      });
    dispatch({
      type: UPDATE_COLUMNS,
      payload: nextColumns,
    });
  }, [defaultColumnOrder, state.columns]);

  const handleUpdateColumns = useCallback(() => {
    ensureFunction(onUpdateColumns)(state.columns);
    ensureFunction(onClose)();
  }, [onClose, onUpdateColumns, state.columns]);

  const [activeId, setActiveId] = useState(null);
  const getColumnById = (id) => state.columns.find(column => column.id === id);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const renderColumn = (column) => (
    <SortableItem id={column.id}>
      {({
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
      }) => {
        let styleProps = {};
        if (!column.isPinned) {
          styleProps = {
            _hover: {
              backgroundColor: isDragging ? 'gray:70' : colorStyle.background.highlighted,
            },
            opacity: isDragging ? 0.4 : undefined,
            transform: CSS.Translate.toString(transform),
            transition,
            // Ensure the draggable element appears on top of other elements when dragged
            zIndex: isDragging ? 'modal' : undefined,
          };
        }

        return (
          <Box
            ref={setNodeRef}
            sx={styleProps}
          >
            <Flex
              alignItems="center"
              py="2x"
            >
              <Flex
                sx={{
                  '*:hover > &': {
                    opacity: 1,
                  },
                  opacity: 0,
                  minWidth: '4x',
                  px: '1x',
                }}
              >
                {!column.isPinned && (
                  <DragHandle
                    ref={setActivatorNodeRef}
                    {...attributes}
                    {...listeners}
                  >
                    <HandleIcon />
                  </DragHandle>
                )}
              </Flex>
              <Checkbox
                disabled={column.isPinned}
                checked={column.isVisible}
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
                sx={{
                  width: '100%',
                }}
              >
                {column.label}
              </Checkbox>
            </Flex>
          </Box>
        );
      }}
    </SortableItem>
  );

  const isPristine = _isEqual(state.columns, columnsProp);

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
          Customize Columns
        </DrawerHeader>
        <DrawerBody>
          <Flex
            mb="4x"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color={colorStyle.color.secondary}>
              Shown in table
            </Text>
            <LinkButton onClick={toggleAllColumns}>
              {isToggleAllChecked ? 'Clear all' : 'Select all'}
            </LinkButton>
          </Flex>
          <DndContext
            sensors={sensors}
            onDragStart={(event) => {
              setActiveId(event.active.id);
            }}
            onDragEnd={({ active, over }) => {
              if (over && active.id !== over?.id) {
                const columns = [...state.columns];
                const activeIndex = columns.findIndex(({ id }) => id === active.id);
                const overIndex = columns.findIndex(({ id }) => id === over.id);
                const nextColumns = arrayMove(columns, activeIndex, overIndex);
                dispatch({
                  type: UPDATE_COLUMNS,
                  payload: nextColumns,
                });
              }
              setActiveId(null);
            }}
            onDragCancel={() => {
              setActiveId(null);
            }}
          >
            <SortableContext
              items={state.columns}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  rowGap: '1x',
                }}
              >
                {state.columns.map((column) => (
                  <Fragment key={column.id}>
                    {renderColumn(column)}
                  </Fragment>
                ))}
              </Flex>
            </SortableContext>
            <SortableOverlay>
              {!isNullish(activeId) ? renderColumn(getColumnById(activeId)) : null}
            </SortableOverlay>
          </DndContext>
        </DrawerBody>
        <DrawerFooter
          justifyContent="space-between"
        >
          <Flex
            alignItems="center"
            columnGap="2x"
          >
            <Button
              disabled={isPristine}
              variant="default"
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
          </Flex>
          <Button
            variant="secondary"
            onClick={handleClickResetToDefault}
          >
            Reset to Default
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ColumnSettingsDrawer;

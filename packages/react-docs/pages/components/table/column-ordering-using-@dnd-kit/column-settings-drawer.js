import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
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
  Grid,
  LinkButton,
  useColorStyle,
} from '@tonic-ui/react';
import { noop } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import _orderBy from 'lodash/orderBy';
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
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

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref: noop,
});

const DragHandle = ({ children, ...rest }) => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <Flex
      ref={ref}
      role="presentation"
      {...attributes}
      {...listeners}
      {...rest}
      sx={{
        alignItems: 'center',
        cursor: 'move',
      }}
    >
      {children}
    </Flex>
  );
};

const SortableOverlay = ({ children }) => {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      {children}
    </DragOverlay>
  );
};

const SortableList = ({
  items,
  onChange,
  renderItem,
}) => {
  const [active, setActive] = useState(null);
  const activeItem = useMemo(() => {
    return items.find((item) => item.id === active?.id);
  }, [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);
          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(active);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <Flex
          sx={{
            flexDirection: 'column',
            rowGap: '1x',
          }}
        >
          {items.map((item) => (
            <Fragment key={item.id}>
              {renderItem(item)}
            </Fragment>
          ))}
        </Flex>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
};

const SortableItem = ({
  children,
  disabled,
  id,
  sx,
  ...rest
}) => {
  const [colorStyle] = useColorStyle();
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(() => ({
    attributes,
    listeners,
    ref: setActivatorNodeRef,
  }), [attributes, listeners, setActivatorNodeRef]);
  const hoverBackgroundColor = (() => {
    if (disabled) {
      return;
    }
    if (isDragging) {
      return 'gray:70';
    }
    return colorStyle.background.highlighted;
  })();
  const style = {
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    // Ensure the draggable element appears on top of other elements when dragged
    zIndex: isDragging ? 'modal' : undefined,
  };
  const sortableItemStyle = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (disabled) {
    return (
      <Box
        sx={[
          style,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  return (
    <SortableItemContext.Provider value={context}>
      <Box
        ref={setNodeRef}
        sx={[
          style,
          sortableItemStyle,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      >
        {children}
      </Box>
    </SortableItemContext.Provider>
  );
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
          <SortableList
            items={state.columns}
            onChange={(columns) => {
              dispatch({
                type: UPDATE_COLUMNS,
                payload: columns,
              });
            }}
            renderItem={(item) => {
              const column = item;
              return (
                <SortableItem
                  id={column.id}
                  disabled={column.isPinned}
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
                      <DragHandle>
                        {!column.isPinned ? <HandleIcon /> : null}
                      </DragHandle>
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
                </SortableItem>
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

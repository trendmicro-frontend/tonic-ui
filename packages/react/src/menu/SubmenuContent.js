import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useSubmenuContentStyle } from './styles';
import useMenu from './useMenu';
import useSubmenu from './useSubmenu';

const SubmenuContent = forwardRef((inProps, ref) => {
  const {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'SubmenuContent' });
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const mouseLeaveTimeoutRef = useRef();
  const menuContext = useMenu(); // context might be an undefined value
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    submenuContentRefs,
  } = { ...menuContext };
  const {
    isHoveringSubmenuContentRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    offset,
    onClose: closeSubmenu,
    placement,
    submenuId,
    submenuToggleId,
    submenuToggleRef,
    submenuContentRef,
  } = { ...submenuContext };

  // Register/unregister submenu content ref with parent menu to handle portal-rendered submenus
  useEffect(() => { // eslint-disable-line consistent-return
    const submenuContentSet = submenuContentRefs?.current;
    if (submenuContentSet && submenuContentRef) {
      // Register submenu content ref
      submenuContentSet.add(submenuContentRef);
      return () => {
        // Unregister submenu content ref
        submenuContentSet.delete(submenuContentRef);
      };
    }
  }, [submenuContentRefs, submenuContentRef]);

  const eventHandler = {};

  eventHandler.onMouseEnter = function (event) {
    isHoveringSubmenuContentRef.current = true;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
  };

  eventHandler.onMouseLeave = function (event) {
    isHoveringSubmenuContentRef.current = false;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringSubmenuToggleRef.current && !isHoveringSubmenuContentRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100); // XXX: keep opening Submenu when cursor quickly move between SubmenuToggle and SubmenuContent
  };

  const tabIndex = -1;
  const styleProps = useSubmenuContentStyle({ tabIndex });

  const [
    skidding = 0,
    distance = 0,
  ] = ensureArray(offset);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/flip/
        name: 'flip',
        enabled: false, // Disable flip functionality
      },
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
      {
        // https://popper.js.org/docs/v2/modifiers/event-listeners/
        name: 'eventListeners',
        options: {
          scroll: false, // Disable scroll event listener to prevent scrolling the popper element with the reference element
          resize: true, // Keep resize event listener enabled (default behavior)
        },
      },
    ];
    return modifiers;
  }, [skidding, distance]);

  return (
    <PopperComponent
      aria-labelledby={submenuToggleId}
      data-submenu-id={submenuId}
      id={submenuId}
      isOpen={isOpen}
      placement={placement}
      ref={submenuContentRef}
      referenceRef={submenuToggleRef}
      role="menu"
      tabIndex={tabIndex}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render menu in a portal
      willUseTransition={true}
      zIndex="dropdown"
      onMouseEnter={callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave)}
      {...PopperProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(PopperProps?.modifiers),
      ]}
      {...styleProps}
      {...rest}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            easing="linear"
            timeout={{
              enter: 133,
              exit: Math.floor(133 * 0.7),
            }}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={callAll(
              onEnter,
              TransitionProps?.onEnter,
            )}
            onExited={callAll(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {children}
          </TransitionComponent>
        );
      }}
    </PopperComponent>
  );
});

SubmenuContent.displayName = 'SubmenuContent';

export default SubmenuContent;

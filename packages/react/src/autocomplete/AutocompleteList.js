import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, isNullish } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import { forwardRef, useMemo, useRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useAutocompleteListStyle } from './styles';
import useAutocompleteContext from './useAutocompleteContext';

const AutocompleteList = forwardRef((inProps, ref) => {
  const {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    width: widthProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AutocompleteList' });
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const {
    anchorRef,
    contentRef,
    getListProps,
    isOpen,
    matchWidth,
    placement,
    portalled,
  } = { ...useAutocompleteContext() };
  const listProps = (typeof getListProps === 'function') ? getListProps() : {};
  const styleProps = useAutocompleteListStyle({
    contentWidth: widthProp,
    inputWidth: anchorRef?.current?.offsetWidth,
    matchWidth,
    portalled,
  });

  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/flip/
        name: 'flip',
        enabled: false, // Disable flip functionality
      },
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
    ];
    return modifiers;
  }, []);

  // Skip the popper when there's nothing to show — consumers can signal
  // "empty" by returning `null` from `renderContent`, and the empty Paper
  // background should not appear under the input.
  const hasContent = !isNullish(children);

  return (
    <PopperComponent
      ref={contentRef}
      isOpen={Boolean(isOpen && hasContent)}
      matchWidth={matchWidth}
      placement={placement}
      referenceRef={anchorRef}
      unmountOnExit={true}
      usePortal={portalled}
      willUseTransition={true}
      zIndex="dropdown"
      {...PopperProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(PopperProps?.modifiers),
      ]}
      {...styleProps}
      {...rest}
      {...listProps}
    >
      {({ transition }) => {
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

AutocompleteList.displayName = 'AutocompleteList';

export default AutocompleteList;

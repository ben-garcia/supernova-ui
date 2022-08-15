import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, CloseIcon, Portal } from '@atoms';
import FocusLock from '@atoms/FocusLock';
import Overlay from '@atoms/Overlay';
import { DrawerProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  useDrawerProvider,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { DialogLikeProps, SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerProps extends SupernovaProps, DialogLikeProps {
  /**
   * The reference element to receive focus when the Drawer first opens
   */
  initialFocusRef?: RefObject<HTMLElement>;
  /**
   * The position relative to the viewport
   *
   * @default 'left'
   */
  placement?: 'bottom' | 'left' | 'right' | 'top';
}

/**
 * The container for all Drawer related components
 * that provides context to its children.
 */
const Drawer: FC<DrawerProps> = props => {
  const {
    children,
    className,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    finalFocusRef,
    initialFocusRef,
    isOpen = false,
    onClickOutside,
    onClose,
    onEscPress,
    placement = 'left',
    size = 'md',
    trapFocus = true,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const [isExiting, setIsExiting] = useState(false);
  const addClasses = useCreateClassString('snui snui-drawer', {
    [`${className}`]: isString(className),
    [`snui-drawer--${placement}`]: true,
    [`snui-drawer--${placement}--exiting`]: isExiting,
    [`snui-drawer--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const enterExitMode = useCallback(() => setIsExiting(true), []);
  const leaveExitMode = useCallback(() => setIsExiting(false), []);
  const handleOnClose = React.useCallback(() => {
    // trigger the slide out animation
    setIsExiting(true);
    // allow time for the animation
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  }, []);
  const { id: drawerId, ...restContext } = useDrawerProvider(props);
  const contextValue = useMemo(
    () => ({
      ...restContext,
      enterExitMode,
      id: drawerId,
      leaveExitMode,
      onClose: handleOnClose,
    }),
    [drawerId, restContext]
  );
  const previousActiveElement = useRef<Element | null>(null);

  // get a reference to the focused element that triggerd the Modal
  useEffect(() => {
    previousActiveElement.current = document.activeElement;

    return () => {
      if (!finalFocusRef?.current) {
        // when Modal is closed, the focus should return to the element
        // that triggered it as per the WAI-ARIA best practices guide
        (previousActiveElement!.current! as HTMLElement).focus();
      } else {
        finalFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <Portal isMounted={isOpen}>
      <DrawerProvider value={contextValue}>
        <FocusLock
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          enterExitMode={enterExitMode}
          initialFocusRef={initialFocusRef}
          leaveExitMode={leaveExitMode}
          onClickOutside={onClickOutside}
          onClose={handleOnClose}
          onEscPress={onEscPress}
          trapFocus={trapFocus}
        >
          <Overlay>
            <section
              {...remainingProps}
              {...addClasses()}
              aria-labelledby={`${drawerId}__header`}
              aria-describedby={`${drawerId}__body`}
              aria-modal="true"
              role="dialog"
            >
              <Button
                aria-label="Close the modal"
                className="snui-drawer__close-button"
                onClick={handleOnClose}
                variant="outline"
              >
                <CloseIcon color="black" size="xs" />
              </Button>
              {children}
            </section>
          </Overlay>
        </FocusLock>
      </DrawerProvider>
    </Portal>
  );
};

export default Drawer;

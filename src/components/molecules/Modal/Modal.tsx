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
import { ModalProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  useModalProvider,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { DialogLikeProps, SupernovaProps } from '@types';
import './styles.scss';

export interface ModalProps extends SupernovaProps, DialogLikeProps {
  /**
   * The reference element to receive focus when the Modal first opens
   */
  initialFocusRef?: RefObject<HTMLElement>;
}

/**
 * The container for all Modal related components
 * that provides context to its children.
 */
const Modal: FC<ModalProps> = props => {
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
  const addClasses = useCreateClassString('snui snui-modal', {
    [`${className}`]: isString(className),
    'snui-modal--exiting': isExiting,
    [`snui-modal--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const enterExitMode = useCallback(() => setIsExiting(true), []);
  const leaveExitMode = useCallback(() => setIsExiting(false), []);
  const handleOnClose = useCallback(() => {
    // trigger the scale out animation
    setIsExiting(true);
    // allow time for the animation
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  }, []);
  const { id: modalId, ...restContext } = useModalProvider(props);
  const contextValue = useMemo(
    () => ({
      ...restContext,
      enterExitMode,
      id: modalId,
      leaveExitMode,
      onClose: handleOnClose,
    }),
    [modalId, restContext]
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
      <ModalProvider value={contextValue}>
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
              aria-labelledby={`${modalId}__header`}
              aria-describedby={`${modalId}__body`}
              aria-modal="true"
              role="dialog"
            >
              <Button
                aria-label="Close the modal"
                className="snui-modal__close-button"
                onClick={handleOnClose}
                variant="outline"
              >
                <CloseIcon color="black" size="xs" />
              </Button>
              {children}
            </section>
          </Overlay>
        </FocusLock>
      </ModalProvider>
    </Portal>
  );
};

export default Modal;

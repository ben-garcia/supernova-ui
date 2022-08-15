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
import { AlertDialogProvider } from '@contexts';
import {
  useAlertDialogProvider,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { DialogLikeProps, SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogProps extends SupernovaProps, DialogLikeProps {
  /**
   * The reference element to receive focus when the AlertDialog opens
   */
  leastDestructiveRef: RefObject<HTMLElement>;
}

/**
 * The container for all AlertDialog related components
 * that provides context to its children.
 */
const AlertDialog: FC<AlertDialogProps> = props => {
  const {
    children,
    className,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    finalFocusRef,
    isOpen = false,
    leastDestructiveRef,
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
  const addClasses = useCreateClassString('snui snui-alert-dialog', {
    [`${className}`]: isString(className),
    'snui-alert-dialog--exiting': isExiting,
    [`snui-alert-dialog--${size}`]: isString(size),
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

  const { id: alertDialogId, ...restContext } = useAlertDialogProvider(props);
  const contextValue = useMemo(
    () => ({
      ...restContext,
      enterExitMode,
      id: alertDialogId,
      leaveExitMode,
      onClickOutside,
      onClose: handleOnClose,
      onEscPress,
    }),
    [alertDialogId, restContext]
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
      <AlertDialogProvider value={contextValue}>
        <FocusLock
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          enterExitMode={enterExitMode}
          initialFocusRef={leastDestructiveRef}
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
              aria-labelledby={`${alertDialogId}__header`}
              aria-describedby={`${alertDialogId}__body`}
              aria-modal="true"
              id={alertDialogId}
              role="alertdialog"
            >
              <Button
                aria-label="Close the alert dialog"
                className="snui-alert-dialog__close-button"
                onClick={handleOnClose}
                variant="outline"
              >
                <CloseIcon color="black" size="xs" />
              </Button>
              {children}
            </section>
          </Overlay>
        </FocusLock>
      </AlertDialogProvider>
    </Portal>
  );
};

export default AlertDialog;

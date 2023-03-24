import React, {
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Portal } from '@atoms';
import { ModalProvider } from '@contexts';
import { useModalProvider } from '@hooks';

import { DialogLikeProps } from '@types';

export interface ModalProps extends DialogLikeProps {
  /**
   * The reference element to receive focus when the Modal first opens
   */
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
}

/**
 * The container for all Modal related components
 * that provides context to its children.
 */
const Modal: FC<ModalProps> = props => {
  const {
    children,
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
  } = props;
  const [isExiting, setIsExiting] = useState(false);
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
      closeOnEsc,
      closeOnOverlayClick,
      enterExitMode,
      finalFocusRef,
      id: modalId,
      initialFocusRef,
      isExiting,
      isOpen,
      leaveExitMode,
      onClickOutside,
      onClose: handleOnClose,
      onEscPress,
      size,
      trapFocus,
    }),
    [modalId, restContext]
  );
  return (
    <Portal isMounted={isOpen}>
      <ModalProvider value={contextValue}>{children}</ModalProvider>
    </Portal>
  );
};

export default Modal;

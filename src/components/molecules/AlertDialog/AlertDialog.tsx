import React, {
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { AlertDialogProvider } from '@contexts';
import { useAlertDialogProvider } from '@hooks';

import { DialogLikeProps } from '@types';

export interface AlertDialogProps extends DialogLikeProps {
  /**
   * The reference element to receive focus after the AlertDialog opens
   */
  leastDestructiveRef: MutableRefObject<HTMLElement | null>;
}

/**
 * The container for all AlertDialog related components
 * that provides context to its children.
 */
const AlertDialog: FC<AlertDialogProps> = props => {
  const {
    children,
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

  const { id: alertDialogId, ...restContext } = useAlertDialogProvider(props);
  const contextValue = useMemo(
    () => ({
      ...restContext,
      closeOnEsc,
      closeOnOverlayClick,
      enterExitMode,
      finalFocusRef,
      id: alertDialogId,
      isExiting,
      isOpen,
      leastDestructiveRef,
      leaveExitMode,
      onClickOutside,
      onClose: handleOnClose,
      onEscPress,
      size,
      trapFocus,
    }),
    [alertDialogId, restContext]
  );

  return (
    <AlertDialogProvider value={contextValue}>{children}</AlertDialogProvider>
  );
};

export default AlertDialog;

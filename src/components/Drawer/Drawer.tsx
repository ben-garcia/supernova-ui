import React, {
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Portal } from '@components';
import { DrawerProvider } from '@contexts';
import { useDrawerProvider } from '@hooks';
import { DialogLikeProps } from '@types';

export interface DrawerProps extends DialogLikeProps {
  /**
   * The reference element to receive focus when the Drawer first opens
   */
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
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
  } = props;
  const [isExiting, setIsExiting] = useState(false);
  const enterExitMode = useCallback(() => setIsExiting(true), []);
  const leaveExitMode = useCallback(() => setIsExiting(false), []);
  const handleOnClose = React.useCallback(() => {
    // trigger the slide out animation
    setIsExiting(true);
    // allow time for the animation
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 200);
  }, []);
  const { id: drawerId, ...restContext } = useDrawerProvider(props);
  const contextValue = useMemo(
    () => ({
      ...restContext,
      closeOnEsc,
      closeOnOverlayClick,
      enterExitMode,
      finalFocusRef,
      id: drawerId,
      initialFocusRef,
      isExiting,
      isOpen,
      leaveExitMode,
      onClickOutside,
      onClose: handleOnClose,
      onEscPress,
      placement,
      size,
      trapFocus,
    }),
    [drawerId, restContext]
  );

  return (
    <Portal isMounted={isOpen}>
      <DrawerProvider value={contextValue}>{children}</DrawerProvider>
    </Portal>
  );
};

export default Drawer;

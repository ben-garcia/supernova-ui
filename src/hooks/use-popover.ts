import { useCallback, useContext, useRef } from 'react';

import { PopoverProps } from '@components/Popover/Popover';
import { PopoverContext } from '@contexts';
import { useUniqueId } from '@hooks';
import { createClasses, isString, mergeRefs } from '@utils';

/**
 * React hook that returns the Popover props.
 */
const usePopoverProvider = (props: PopoverProps) => {
  const {
    closeOnBlur,
    closeOnEsc,
    finalFocusRef,
    initialFocusRef,
    isOpen,
    onBlur,
    onClose,
    onEscPress,
    onToggle,
    trapFocus,
    shouldReturnFocusOnClose,
  } = props;

  const id = useUniqueId('snui-popover');
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);

  const getPopoverButtonProps = useCallback(
    (popoverButtonProps = {}, forwardedRef = null) => ({
      ...popoverButtonProps,
      ref: mergeRefs(forwardedRef, popoverButtonRef, () => {}),
    }),
    []
  );
  const getPopoverBodyProps = useCallback(
    (popoverBodyProps = {}) => {
      const { className } = popoverBodyProps;
      const classes = createClasses('snui snui-popover__body', {
        [`${className}`]: isString(className),
      });
      return {
        ...popoverBodyProps,
        className: classes,
        id: `${id}__body`,
      };
    },
    [id]
  );
  const getPopoverHeaderProps = useCallback(
    (popoverHeaderProps = {}) => {
      const { className } = popoverHeaderProps;
      const classes = createClasses('snui snui-popover__header', {
        [`${className}`]: isString(className),
      });
      return {
        ...popoverHeaderProps,
        className: classes,
        id: `${id}__header`,
      };
    },
    [id]
  );
  const getPopoverFooterProps = useCallback(
    (popoverFooterProps = {}) => {
      const { className } = popoverFooterProps;
      const classes = createClasses('snui snui-popover__footer', {
        [`${className}`]: isString(className),
      });

      return {
        ...popoverFooterProps,
        className: classes,
        id: `${id}__footer`,
      };
    },
    [id]
  );

  return {
    closeOnEsc,
    closeOnBlur,
    finalFocusRef,
    getPopoverBodyProps,
    getPopoverButtonProps,
    getPopoverHeaderProps,
    getPopoverFooterProps,
    id,
    initialFocusRef,
    isOpen,
    onBlur,
    onClose,
    onEscPress,
    onToggle,
    popoverButtonRef,
    trapFocus,
    shouldReturnFocusOnClose,
  };
};

/**
 * React Hook that returns Propover  context.
 */
const usePopover = () => {
  const context = useContext(PopoverContext);

  if (!context.id) {
    throw new Error(
      'usePopover: context is undefined, did you remember to wrap your component in a <Popover>'
    );
  }
  return context;
};

export { usePopover, usePopoverProvider };

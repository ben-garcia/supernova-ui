import { useCallback, useContext } from 'react';

import { AlertDialogContext } from '@contexts';
import { useUniqueId } from '@hooks';
import { createClasses, isString } from '@utils';

import { AlertDialogProps } from '@molecules/AlertDialog/AlertDialog';

/** Hooks that returns the AlertDialog props
 */
export const useAlertDialogProvider = (props: AlertDialogProps) => {
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    isOpen,
    leastDestructiveRef,
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  } = props;

  const id = useUniqueId('snui-dialog-alert');

  const getAlertDialogBodyProps = useCallback(
    (alertDialogBodyProps = {}) => {
      const { className } = alertDialogBodyProps;
      const classes = createClasses('snui snui-alert-dialog__body', {
        [`${className}`]: isString(className),
      });
      return {
        ...alertDialogBodyProps,
        className: classes,
        id: `${id}__body`,
      };
    },
    [id]
  );
  const getAlertDialogHeaderProps = useCallback(
    (alertDialogHeaderProps = {}) => {
      const { className } = alertDialogHeaderProps;
      const classes = createClasses('snui snui-alert-dialog__header', {
        [`${className}`]: isString(className),
      });
      return {
        ...alertDialogHeaderProps,
        className: classes,
        id: `${id}__header`,
      };
    },
    [id]
  );
  const getAlertDialogFooterProps = useCallback(
    (alertDialogFooterProps = {}) => {
      const { className } = alertDialogFooterProps;
      const classes = createClasses('snui snui-alert-dialog__footer', {
        [`${className}`]: isString(className),
      });

      return {
        ...alertDialogFooterProps,
        className: classes,
        id: `${id}__footer`,
      };
    },
    [id]
  );

  return {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    getAlertDialogBodyProps,
    getAlertDialogHeaderProps,
    getAlertDialogFooterProps,
    id,
    isOpen,
    leastDestructiveRef,
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  };
};

/**
 * Hooks that returns all AlertDialog props
 */
export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);

  if (!context.id) {
    throw new Error(
      'useAlertDialog: context is undefined, did you remember to wrap your component in a pair of <AlertDialog>'
    );
  }
  return context;
};

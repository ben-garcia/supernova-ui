import { useCallback, useContext } from 'react';

import { AlertDialogContext } from '../contexts';
import { useUniqueId } from '.';
import { createClasses, isString } from '../utils';
import { AlertDialogProps } from '../components/molecules/AlertDialog/types';

/** Hooks that returns the AlertDialog props
 */
const useAlertDialogProvider = (props: AlertDialogProps) => {
  const {
    isOpen,
    onClose,
    closeOnEsc,
    finalFocusRef,
    leastDestructiveRef,
  } = props;

  const id = useUniqueId('snui-dialog-alert');

  const getAlertDialogBodyProps = useCallback(
    (alertDialogBodyProps = {}) => {
      const { className } = alertDialogBodyProps;
      const classes = createClasses('snui-alert-dialog__body', {
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
      const classes = createClasses('snui-alert-dialog__header', {
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
      const classes = createClasses('snui-alert-dialog__footer', {
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
    finalFocusRef,
    getAlertDialogBodyProps,
    getAlertDialogHeaderProps,
    getAlertDialogFooterProps,
    id,
    isOpen,
    leastDestructiveRef,
    onClose,
  };
};

/**
 * Hooks that returns all AlertDialog props
 */
const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);

  if (!context.id) {
    throw new Error(
      'useAlertDialog: context is undefined, did you remember to wrap your component in a pair of <AlertDialog>'
    );
  }
  return context;
};

export { useAlertDialog, useAlertDialogProvider };

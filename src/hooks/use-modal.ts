import { useCallback, useContext } from 'react';

import { ModalProps } from '@components/Modal/Modal';
import { ModalContext } from '@contexts';
import { useUniqueId } from '@hooks';
import { createClasses, isString } from '@utils';

/**
 * React hook that returns the Modal props.
 */
const useModalProvider = (props: ModalProps) => {
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    initialFocusRef,
    isOpen,
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  } = props;

  const id = useUniqueId('snui-modal');

  const getModalBodyProps = useCallback(
    (modalBodyProps = {}) => {
      const { className } = modalBodyProps;
      const classes = createClasses('snui snui-modal__body', {
        [`${className}`]: isString(className),
      });
      return {
        ...modalBodyProps,
        className: classes,
        id: `${id}__body`,
      };
    },
    [id]
  );
  const getModalHeaderProps = useCallback(
    (modalHeaderProps = {}) => {
      const { className } = modalHeaderProps;
      const classes = createClasses('snui snui-modal__header', {
        [`${className}`]: isString(className),
      });
      return {
        ...modalHeaderProps,
        className: classes,
        id: `${id}__header`,
      };
    },
    [id]
  );
  const getModalFooterProps = useCallback(
    (modalFooterProps = {}) => {
      const { className } = modalFooterProps;
      const classes = createClasses('snui snui-modal__footer', {
        [`${className}`]: isString(className),
      });

      return {
        ...modalFooterProps,
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
    getModalBodyProps,
    getModalHeaderProps,
    getModalFooterProps,
    id,
    initialFocusRef,
    isOpen,
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  };
};

/**
 * Hooks that returns Modal context.
 */
const useModal = () => {
  const context = useContext(ModalContext);

  if (!context.id) {
    throw new Error(
      'useModal: context is undefined, did you remember to wrap your component in a <Modal>'
    );
  }
  return context;
};

export { useModal, useModalProvider };

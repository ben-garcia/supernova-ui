import { HTMLAttributes, useCallback, useContext } from 'react';

import { ModalRootProps } from '@components/Modal/ModalRoot';
import { ModalContext } from '@contexts/modal/ModalProvider';
import { useUniqueId } from '@hooks/use-unique-id';
import { isString } from '@utils/assertions';
import { createClasses } from '@utils/create-classes';

/**
 * React hook that returns the Modal props.
 */
const useModalProvider = (props: ModalRootProps) => {
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
    (modalBodyProps: HTMLAttributes<HTMLElement> = {}) => {
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
    (modalHeaderProps: HTMLAttributes<HTMLElement> = {}) => {
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
    (modalFooterProps: HTMLAttributes<HTMLElement> = {}) => {
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

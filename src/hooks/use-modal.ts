import { useCallback, useContext, useState } from 'react';

import { ModalContext } from '../contexts';

import { ModalProps } from '../components/molecules/Modal/types';

/** Hooks that returns the Modal props
 */
const useModalProvider = (props: ModalProps) => {
  const {
    id: propId,
    isOpen,
    onClose,
    closeOnEsc,
    finalFocusRef,
    initialFocusRef,
  } = props;

  const [id] = useState(propId || `modal-${Math.random()}`);

  const getModalBodyProps = useCallback(
    (modalBodyProps = {}) => ({
      ...modalBodyProps,
      className: '_snui-modal__body',
      id: `${id}-body`,
    }),
    [id]
  );
  const getModalHeaderProps = useCallback(
    (modalHeaderProps = {}) => ({
      ...modalHeaderProps,
      className: '_snui-modal__header',
      id: `${id}-header`,
    }),
    [id]
  );
  const getModalFooterProps = useCallback(
    (modalFooterProps = {}) => ({
      ...modalFooterProps,
      className: '_snui-modal__footer',
      id: `${id}-footer`,
    }),
    [id]
  );

  return {
    closeOnEsc,
    finalFocusRef,
    getModalBodyProps,
    getModalHeaderProps,
    getModalFooterProps,
    id,
    initialFocusRef,
    isOpen,
    onClose,
  };
};

/**
 * Hooks that returns all modal props
 */
const useModal = () => {
  const context = useContext(ModalContext);

  if (!context.id) {
    throw new Error(
      'useModal: context is undefined, did you remember to wrap your component in a <Modal />'
    );
  }
  return context;
};

export { useModal, useModalProvider };

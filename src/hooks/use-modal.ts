import { useContext, useState } from 'react';

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

  return {
    closeOnEsc,
    finalFocusRef,
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

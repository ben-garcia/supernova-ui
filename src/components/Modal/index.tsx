import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import { Button, Overlay } from '@components';
import ModalRoot, { ModalRootProps } from './ModalRoot';
import ModalBody, { ModalBodyProps } from './ModalBody';
import ModalButton, { ModalButtonProps } from './ModalButton';
import ModalCloseButton from './ModalCloseButton';
import ModalContent, { ModalContentProps } from './ModalContent';
import ModalFooter, { ModalFooterProps } from './ModalFooter';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';
import ModalOverlay from './ModalOverlay';

interface ModalComponent {
  /**
   * The container for all Modal related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<ModalRootProps>>;
  /**
   * The wrapper for the main content of the Modal.
   */
  Body: FC<PropsWithChildren<ModalBodyProps>>;
  /**
   * The button for the Modal component.
   */
  Button: ForwardRefExoticComponent<ModalButtonProps>;
  /**
   * The close button for the Modal component.
   */
  CloseButton: FC<Parameters<typeof Button>[0]>;
  /**
   * The container for Modal related components.
   */
  Content: FC<PropsWithChildren<ModalContentProps>>;
  /**
   * The wrapper for the footer content of the Modal.
   */
  Footer: FC<PropsWithChildren<ModalFooterProps>>;
  /**
   * The wrapper for the header content of the Modal.
   */
  Header: FC<PropsWithChildren<ModalHeaderProps>>;
  /**
   * The overlay for the Modal component.
   */
  Overlay: FC<Parameters<typeof Overlay>[0]>;
}

const Modal: ModalComponent = {
  Root: ModalRoot,
  Body: ModalBody,
  Button: ModalButton,
  CloseButton: ModalCloseButton,
  Content: ModalContent,
  Footer: ModalFooter,
  Header: ModalHeader,
  Overlay: ModalOverlay,
};

export default Modal;

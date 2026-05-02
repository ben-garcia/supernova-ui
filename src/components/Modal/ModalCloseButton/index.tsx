import React, { FC } from 'react';

import Button from '@components/Button';
import CloseIcon from '@components/Icon/Icons/CloseIcon';
import { useModal } from '@hooks/use-modal';
import './styles.scss';

/**
 * The close button for the Modal component.
 */
const ModalCloseButton: FC<Parameters<typeof Button>[0]> = props => {
  const { onClose } = useModal();

  return (
    <Button
      aria-label="Close the modal"
      {...props}
      className="snui-modal__close-button"
      onClick={onClose}
      variant="outline"
    >
      <CloseIcon color="var(--snui-color-gray600)" size="xs" />
    </Button>
  );
};

export default ModalCloseButton;

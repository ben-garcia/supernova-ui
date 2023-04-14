import React, { FC } from 'react';

import { Button, CloseIcon } from '@components';
import { useAlertDialog } from '@hooks';

import './styles.scss';

/**
 * The close button for the AlertDialog component.
 */
const AlertDialogCloseButton: FC<Parameters<typeof Button>[0]> = props => {
  const { onClose } = useAlertDialog();

  return (
    <Button
      aria-label="Close the alert dialog"
      {...props}
      className="snui-alert-dialog__close-button"
      onClick={onClose}
      variant="outline"
    >
      <CloseIcon color="var(--snui-color-gray600)" size="xs" />
    </Button>
  );
};

export default AlertDialogCloseButton;

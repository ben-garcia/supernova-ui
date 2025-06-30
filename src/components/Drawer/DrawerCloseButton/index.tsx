import React, { FC } from 'react';

import { Button, CloseIcon } from '@components';
import { useDrawer } from '@hooks';
import './styles.scss';

/**
 * The close button for the Drawer component.
 */
const DrawerCloseButton: FC<Parameters<typeof Button>[0]> = props => {
  const { onClose } = useDrawer();

  return (
    <Button
      aria-label="Close the modal"
      {...props}
      className="snui-drawer__close-button"
      onClick={onClose}
      variant="outline"
    >
      <CloseIcon color="var(--snui-color-gray600)" size="xs" />
    </Button>
  );
};

export default DrawerCloseButton;

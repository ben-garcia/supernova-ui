import React, { FC } from 'react';

import { Button, CloseIcon } from '@atoms';
import { usePopover } from '@hooks';

import './styles.scss';

/**
 * The close button for the Modal component.
 */
const PopoverCloseButton: FC<Parameters<typeof Button>[0]> = props => {
  const { onClose } = usePopover();

  return (
    <Button
      {...props}
      aria-label="Close the Popover"
      className="snui-popover__close-button"
      onClick={onClose}
      variant="outline"
    >
      <CloseIcon color="var(--snui-color-gray600)" height="12px" width="12ps" />
    </Button>
  );
};

export default PopoverCloseButton;

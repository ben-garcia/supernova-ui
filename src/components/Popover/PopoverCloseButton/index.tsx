import React, { FC } from 'react';

import Button from '@components/Button';
import CloseIcon from '@components/Icon/Icons/CloseIcon';
import { usePopover } from '@hooks/use-popover';
import './styles.scss';

/**
 * The close button for the Popover component.
 */
const PopoverCloseButton: FC<Parameters<typeof Button>[0]> = props => {
  const { onClose } = usePopover();

  return (
    <Button
      aria-label="Close the Popover"
      {...props}
      className="snui-popover__close-button"
      onClick={onClose}
      variant="outline"
    >
      <CloseIcon color="var(--snui-color-gray600)" height="12px" width="12ps" />
    </Button>
  );
};

export default PopoverCloseButton;

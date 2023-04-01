import React, { FC } from 'react';

import { usePopover } from '@hooks';
import { isFunction } from '@utils';

interface PopoverTriggerProps {
  children: React.ReactNode;
}

/**
 * The wrapper for the trigger Popover component.
 */
const PopoverTrigger: FC<PopoverTriggerProps> = props => {
  const { children } = props;
  const { isOpen, id: popoverId, onToggle, popoverButtonRef } = usePopover();

  return React.cloneElement(children as any, {
    'aria-controls': popoverId,
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
    id: `${popoverId}__button`,
    onClick: isFunction(onToggle) ? () => onToggle!() : undefined,
    ref: popoverButtonRef,
  });
};

export default PopoverTrigger;

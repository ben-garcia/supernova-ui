import React, { useCallback } from 'react';

import { Button } from '../../../atoms';
import { ButtonProps } from '../../../atoms/Button/types';
import { createClasses, isFunction, isString } from '../../../../utils';
import { useModal } from '../../../../hooks';

type ModalButtonProps = ButtonProps;

/**
 * The button for the Modal component.
 */
const ModalButton: React.FC<ModalButtonProps> = props => {
  const { children, className, onClick, ...rest } = props;

  const { enterExitMode, leaveExitMode } = useModal();
  const handleClick = useCallback((e: React.SyntheticEvent<Element>) => {
    enterExitMode!();
    setTimeout(() => {
      leaveExitMode!();
      if (isFunction(onClick)) {
        onClick!(e);
      }
    }, 300);
  }, []);

  const classes = createClasses('snui-modal__button', {
    [`${className}`]: isString(className),
  });

  return (
    <Button onClick={handleClick} {...rest} className={classes}>
      {children}
    </Button>
  );
};

export default ModalButton;

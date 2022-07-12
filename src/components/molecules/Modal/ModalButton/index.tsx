import React, { forwardRef, useCallback } from 'react';

import { Button } from '@atoms';
import { useModal } from '@hooks';
import { createClasses, isFunction, isString } from '@utils';

import { ButtonProps } from '../../../atoms/Button/types';

type ModalButtonProps = ButtonProps;

/**
 * The button for the Modal component.
 */
const ModalButton = forwardRef((props: ModalButtonProps, ref: any) => {
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
    <Button onClick={handleClick} ref={ref} {...rest} className={classes}>
      {children}
    </Button>
  );
});

export default ModalButton;

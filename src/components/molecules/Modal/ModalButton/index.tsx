import React, { MouseEvent, forwardRef, useCallback } from 'react';

import { Button } from '@atoms';
import { useCreateClassString, useModal } from '@hooks';
import { createClasses, isFunction, isString } from '@utils';

import { ButtonProps } from '../../../atoms/Button/types';

type ModalButtonProps = ButtonProps;

/**
 * The button for the Modal component.
 */
const ModalButton = forwardRef((props: ModalButtonProps, ref: any) => {
  const { children, className, onClick, ...rest } = props;

  const { enterExitMode, leaveExitMode } = useModal();
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    enterExitMode!();
    setTimeout(() => {
      leaveExitMode!();
      if (isFunction(onClick)) {
        onClick!(e);
      }
    }, 300);
  }, []);

  const addClasses = useCreateClassString('snui-modal__button', {
    [`${className}`]: isString(className),
  });

  return (
    <Button onClick={handleClick} ref={ref} {...rest} {...addClasses()}>
      {children}
    </Button>
  );
});

export default ModalButton;

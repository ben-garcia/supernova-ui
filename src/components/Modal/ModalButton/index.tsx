import React, { MouseEvent, useCallback } from 'react';

import { Button } from '@components';
import { ButtonProps } from '@components/Button/types';
import { useCreateClassString, useModal } from '@hooks';
import { forwardRef, isFunction, isString } from '@utils';

type ModalButtonProps = ButtonProps;

/**
 * The button for the Modal component.
 */
const ModalButton = forwardRef<ModalButtonProps, HTMLButtonElement>(
  (props, ref) => {
    const { children, className, onClick, ...rest } = props;

    const { enterExitMode, leaveExitMode } = useModal();
    const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      enterExitMode!();
      setTimeout(() => {
        leaveExitMode!();
        if (isFunction(onClick)) {
          onClick!(e);
        }
      }, 100);
    }, []);

    const addClasses = useCreateClassString('snui-modal__button', {
      [`${className}`]: isString(className),
    });

    return (
      <Button
        onClick={handleClick}
        ref={ref as any}
        {...rest}
        {...addClasses()}
      >
        {children}
      </Button>
    );
  }
);

export default ModalButton;

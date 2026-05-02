import React, { MouseEvent, useCallback } from 'react';

import Button from '@components/Button';
import { useCreateClassString } from '@hooks/use-create-class';
import { useModal } from '@hooks/use-modal';
import { isFunction, isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';
import type { ButtonProps } from '@components/Button/types';

export type ModalButtonProps = ButtonProps;

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

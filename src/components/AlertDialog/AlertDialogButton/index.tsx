import React, { MouseEvent, useCallback } from 'react';

import Button from '@components/Button';
import type { ButtonProps } from '@components/Button/types';
import { useAlertDialog } from '@hooks/use-alert-dialog';
import { useCreateClassString } from '@hooks/use-create-class';
import { isFunction, isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';

export type AlertDialogButtonProps = ButtonProps;

/**
 * The button for the AlertDialog component.
 */
const AlertDialogButton = forwardRef<AlertDialogButtonProps, HTMLButtonElement>(
  (props, ref) => {
    const { children, className, onClick, ...rest } = props;

    const { enterExitMode, leaveExitMode } = useAlertDialog();
    const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      enterExitMode!();
      setTimeout(() => {
        leaveExitMode!();
        if (isFunction(onClick)) {
          onClick!(e);
        }
      }, 100);
    }, []);

    const addClasses = useCreateClassString('snui snui-alert-dialog__button', {
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

export default AlertDialogButton;

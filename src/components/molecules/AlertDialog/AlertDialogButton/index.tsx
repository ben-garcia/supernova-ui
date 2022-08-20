import React, { MouseEvent, useCallback } from 'react';

import { Button } from '@atoms';
import { ButtonProps } from '@atoms/Button/types';
import { createClasses, forwardRef, isFunction, isString } from '@utils';
import { useAlertDialog } from '@hooks';

type AlertDialogButtonProps = ButtonProps;

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
      }, 300);
    }, []);

    const classes = createClasses('snui snui-alert-dialog__button', {
      [`${className}`]: isString(className),
    });

    return (
      <Button
        onClick={handleClick}
        ref={ref as any}
        {...rest}
        className={classes}
      >
        {children}
      </Button>
    );
  }
);

export default AlertDialogButton;

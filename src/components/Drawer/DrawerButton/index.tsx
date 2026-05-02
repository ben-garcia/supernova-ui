import React, { MouseEvent, useCallback } from 'react';

import Button from '@components/Button';
import type { ButtonProps } from '@components/Button/types';
import { useCreateClassString } from '@hooks/use-create-class';
import { useDrawer } from '@hooks/use-drawer';
import { isFunction, isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';

export type DrawerButtonProps = ButtonProps;

/**
 * The button for the Drawer component.
 */
const DrawerButton = forwardRef<DrawerButtonProps, HTMLButtonElement>(
  (props, ref) => {
    const { children, className, onClick, ...rest } = props;

    const { enterExitMode, leaveExitMode } = useDrawer();
    const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      enterExitMode!();
      setTimeout(() => {
        leaveExitMode!();
        if (isFunction(onClick)) {
          onClick!(e);
        }
      }, 200);
    }, []);

    const addClasses = useCreateClassString('snui-drawer__button', {
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

export default DrawerButton;

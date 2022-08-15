import React, { MouseEvent, forwardRef, useCallback } from 'react';

import { Button } from '@atoms';
import { useCreateClassString, useDrawer } from '@hooks';
import { isFunction, isString } from '@utils';

import { ButtonProps } from '@atoms/Button/types';

type DrawerButtonProps = ButtonProps;

/**
 * The button for the Drawer component.
 */
const DrawerButton = forwardRef((props: DrawerButtonProps, ref: any) => {
  const { children, className, onClick, ...rest } = props;

  const { enterExitMode, leaveExitMode } = useDrawer();
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    enterExitMode!();
    setTimeout(() => {
      leaveExitMode!();
      if (isFunction(onClick)) {
        onClick!(e);
      }
    }, 300);
  }, []);

  const addClasses = useCreateClassString('snui-drawer__button', {
    [`${className}`]: isString(className),
  });

  return (
    <Button onClick={handleClick} ref={ref} {...rest} {...addClasses()}>
      {children}
    </Button>
  );
});

export default DrawerButton;

import React, { forwardRef, useCallback } from 'react';

import { Button } from '../../../atoms';
import { ButtonProps } from '../../../atoms/Button/types';
import { createClasses, isFunction, isString } from '../../../../utils';
import { useDrawer } from '../../../../hooks';

type DrawerButtonProps = ButtonProps;

/**
 * The button for the Drawer component.
 */
const DrawerButton = forwardRef((props: DrawerButtonProps, ref: any) => {
  const { children, className, onClick, ...rest } = props;

  const { enterExitMode, leaveExitMode } = useDrawer();
  const handleClick = useCallback((e: React.SyntheticEvent<Element>) => {
    enterExitMode!();
    setTimeout(() => {
      leaveExitMode!();
      if (isFunction(onClick)) {
        onClick!(e);
      }
    }, 300);
  }, []);

  const classes = createClasses('snui-drawer__button', {
    [`${className}`]: isString(className),
  });

  return (
    <Button onClick={handleClick} ref={ref} {...rest} className={classes}>
      {children}
    </Button>
  );
});

export default DrawerButton;

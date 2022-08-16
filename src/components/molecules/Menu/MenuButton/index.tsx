import React, { FC } from 'react';

import { Button } from '@atoms';
import { useMenu } from '@hooks';
import { createClasses, isString } from '@utils';

import { ButtonProps } from '@atoms/Button/types';

interface MenuButtonProps extends ButtonProps {}

/**
 * The trigger for the Menu.
 */
const MenuButton: FC<MenuButtonProps> = props => {
  const { children, className, ...rest } = props;
  const { isOpen, menuButtonRef, menuId } = useMenu();
  const classes = createClasses('', {
    [`${className}`]: isString(className),
  });

  return (
    <Button
      {...rest}
      aria-controls={`${menuId}__list`}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={classes}
      id={`${menuId}__button`}
      ref={menuButtonRef}
    >
      {children}
    </Button>
  );
};

export default MenuButton;

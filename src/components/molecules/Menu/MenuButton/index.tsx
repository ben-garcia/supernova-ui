import React from 'react';

import { useMenu } from '../../../../hooks';
import Button from '../../../atoms/Button';
import { ButtonProps } from '../../../atoms/Button/types';
import { createClasses, isString } from '../../../../utils';

interface MenuButtonProps extends ButtonProps {
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = props => {
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

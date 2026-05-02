import React, { useCallback, FC } from 'react';

import Button from '@components/Button';
import type { ButtonProps } from '@components/Button/types';
import { useMenu } from '@hooks/use-menu';
import { isString } from '@utils/assertions';
import { createClasses } from '@utils/create-classes';

export interface MenuButtonProps extends ButtonProps {}

/**
 * The trigger for the Menu component.
 */
const MenuButton: FC<MenuButtonProps> = props => {
  const { children, className, onClick, ...rest } = props;
  const { isOpen, menuButtonRef, menuId } = useMenu();
  const classes = createClasses('', {
    [`${className}`]: isString(className),
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevents the window listener from firing
      if (onClick) onClick(e);
    },
    [onClick]
  );

  return (
    <Button
      {...rest}
      onClick={handleClick}
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

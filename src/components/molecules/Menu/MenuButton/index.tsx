import React from 'react';

import { useMenu } from '../../../../hooks';
import Button from '../../../atoms/Button';
import { ButtonProps } from '../../../atoms/Button/types';

const MenuButton: React.FC<ButtonProps> = props => {
  const { children, ...rest } = props;
  const { id, isOpen, menuButtonRef } = useMenu();

  return (
    <Button
      {...rest}
      aria-controls={`${id}-list`}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      id={`${id}-button`}
      ref={menuButtonRef}
    >
      {children}
    </Button>
  );
};

export default MenuButton;

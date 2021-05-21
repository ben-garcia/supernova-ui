import React, { forwardRef, useState } from 'react';

import { useMenu, useTheme } from '../../../../hooks';
import { createClasses, isFunction, isString } from '../../../../utils';

import './styles.scss';

export interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MenuItem = forwardRef((props: MenuItemProps, ref: any) => {
  const { children, className, onClick = null } = props;
  const { activeMenuItem, onClose, getMenuItemProps } = useMenu();
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');
  const classes = createClasses(
    'snui-menu-item snui-flex snui-items-center snui-padding-inline-left',
    {
      [`${className}`]: isString(className),
    }
  );

  const handleMouseEnter = () => {
    if (activeMenuItem?.current) {
      activeMenuItem.current.style.backgroundColor = '';
      activeMenuItem.current.style.color = 'black';
    }
    setBackgroundColor(theme.colors.info600);
    setColor(theme.colors.white);
  };

  const handleMouseLeave = () => {
    setBackgroundColor('');
    setColor(theme.colors.black);
  };

  const handleClick = () => {
    if (isFunction(onClick)) {
      onClick!();
    }
    onClose();
  };

  return (
    <button
      {...getMenuItemProps(props, ref)}
      className={classes}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menuitem"
      style={{
        backgroundColor,
        color,
      }}
      tabIndex={-1}
      type="button"
    >
      {children}
    </button>
  );
});

export default MenuItem;

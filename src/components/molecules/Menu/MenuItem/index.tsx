import React, { forwardRef, useState } from 'react';

import { useMenu, useTheme } from '../../../../hooks';

import './styles.scss';

export interface MenuItemProps {
  children: React.ReactNode;
}

const MenuItem = forwardRef((props: MenuItemProps, ref: any) => {
  const { children } = props;
  const { activeMenuItem, onClose, getMenuItemProps } = useMenu();
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');

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

  return (
    <button
      {...getMenuItemProps(props, ref)}
      className="_snui-menu-item _snui-flex _snui-items-center _snui-padding-inline-left"
      onClick={onClose}
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

import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useMenu, useTheme } from '../../../../hooks';
import { createClasses, isFunction, isString } from '../../../../utils';

import './styles.scss';

export interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Menu option to select from.
 */
const MenuItem = forwardRef((props: MenuItemProps, ref: any) => {
  const { children, className, onClick = null } = props;
  const {
    focusedIndex,
    isOpen,
    onClose,
    getMenuItemProps,
    setFocusedIndex,
  } = useMenu();
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');
  const classes = createClasses(
    'snui-menu-item snui-flex snui-items-center snui-padding-inline-left',
    {
      [`${className}`]: isString(className),
    }
  );

  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const index = Number(
        buttonRef.current.getAttribute('data-snui-menu-item-index')
      );

      if (focusedIndex === index) {
        buttonRef.current.focus();
        buttonRef.current.setAttribute('tabIndex', '0');
        setBackgroundColor(theme.colors.info600);
        setColor(theme.colors.white);
      } else {
        buttonRef.current.setAttribute('tabIndex', '-1');
        setBackgroundColor(theme.colors.transparent);
        setColor(theme.colors.black);
      }
    }
  }, [isOpen, focusedIndex, buttonRef?.current]);

  const handleMouseEnter = () => {
    const index = Number(
      buttonRef?.current?.getAttribute('data-snui-menu-item-index')
    );

    setFocusedIndex(index);
  };

  const handleMouseLeave = () => {
    setFocusedIndex(-1);
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
      ref={buttonRef}
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

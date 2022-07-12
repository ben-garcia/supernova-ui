import React from 'react';

import { useMenu } from '@hooks';
import { createClasses, isString } from '@utils';

interface MenuGroupProps {
  children: React.ReactNode;
  className?: string;
  /*
   * the header that describes how items are grouped
   */
  title: string;
}

/**
 * Wrapper to group relatved MenuItem
 */
const MenuGroup: React.FC<MenuGroupProps> = props => {
  const { children, className, title } = props;
  const classes = createClasses('snui-flex snui-flex-column', {
    [`${className}`]: isString(className),
  });

  useMenu();

  return (
    <div className={classes} role="group">
      <span className="snui-padding-inline-left snui-font-weight-xl snui-margin-y-sm snui-text-sm snui-font-heading">
        {title}
      </span>
      {children}
    </div>
  );
};

export default MenuGroup;

import React from 'react';

import { useMenu } from '../../../../hooks';

interface MenuGroupProps {
  children: React.ReactNode;
  /*
   * the header that describes how items are grouped
   */
  title: string;
}

const MenuGroup: React.FC<MenuGroupProps> = props => {
  const { children, title } = props;
  useMenu();

  return (
    <div className="snui-flex snui-flex-column" role="group">
      <span className="snui-padding-inline-left snui-font-weight-xl snui-margin-y-sm snui-text-sm snui-font-heading">
        {title}
      </span>
      {children}
    </div>
  );
};

export default MenuGroup;

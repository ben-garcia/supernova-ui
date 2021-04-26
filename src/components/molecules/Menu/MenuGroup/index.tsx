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
    <div className="_snui-flex _snui-flex-column" role="group">
      <span className="_snui-padding-inline-left _snui-font-weight-xl _snui-margin-y-sm _snui-text-sm _snui-font-heading">
        {title}
      </span>
      {children}
    </div>
  );
};

export default MenuGroup;

import React, { Children, cloneElement, useCallback, ReactNode } from 'react';

import { useDrawer } from '../../../../hooks';

import './styles.scss';

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

const DrawerFooter: React.FC<DrawerFooterProps> = props => {
  const { children, ...rest } = props;
  const { getDrawerFooterProps, onClose } = useDrawer();
  const handleOnClick = useCallback(() => onClose(), []);
  const enhancedChildren: ReactNode[] = [];

  // loop through the children
  Children.toArray(children).map((child: any) =>
    child.props.children.forEach((c: any) => {
      if (c.props.onClick) {
        enhancedChildren.push(cloneElement(c, { onClick: handleOnClick }));
      } else {
        enhancedChildren.push(cloneElement(c));
      }
    })
  );

  return <footer {...getDrawerFooterProps(rest)}>{enhancedChildren}</footer>;
};

export default DrawerFooter;

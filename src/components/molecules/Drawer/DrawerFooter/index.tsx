import React, { ReactNode } from 'react';

import { useDrawer } from '@hooks';

import './styles.scss';

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * The wrapper for the footer content of the Drawer.
 */
const DrawerFooter: React.FC<DrawerFooterProps> = props => {
  const { children, ...rest } = props;
  const { getDrawerFooterProps } = useDrawer();

  return <footer {...getDrawerFooterProps(rest)}>{children}</footer>;
};

export default DrawerFooter;

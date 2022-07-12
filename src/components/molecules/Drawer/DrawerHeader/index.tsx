import React from 'react';

import { useDrawer } from '@hooks';

import './styles.scss';

export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the header content of the Drawer.
 */
const DrawerHeader: React.FC<DrawerHeaderProps> = props => {
  const { children, ...rest } = props;
  const { getDrawerHeaderProps } = useDrawer();

  return <header {...getDrawerHeaderProps(rest)}>{children}</header>;
};

export default DrawerHeader;

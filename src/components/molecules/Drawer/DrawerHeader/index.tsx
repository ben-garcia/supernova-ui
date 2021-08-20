import React from 'react';

import { useDrawer } from '../../../../hooks';

import './styles.scss';

export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = props => {
  const { children, ...rest } = props;
  const { getDrawerHeaderProps } = useDrawer();

  return <header {...getDrawerHeaderProps(rest)}>{children}</header>;
};

export default DrawerHeader;

import React from 'react';

import { useDrawer } from '@hooks';

import './styles.scss';

export interface DrawerBodyProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the main content of the Drawer.
 */
const ModalBody: React.FC<DrawerBodyProps> = props => {
  const { children, ...rest } = props;
  const { getDrawerBodyProps } = useDrawer();

  return <div {...getDrawerBodyProps(rest)}>{children}</div>;
};

export default ModalBody;

import React from 'react';

import { useAlertDialog } from '@hooks';

import './styles.scss';

export interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = props => {
  const { children, ...rest } = props;
  const { getAlertDialogHeaderProps } = useAlertDialog();

  return <header {...getAlertDialogHeaderProps(rest)}>{children}</header>;
};

export default AlertDialogHeader;

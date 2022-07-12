import React, { FC } from 'react';

import { useAlertDialog } from '@hooks';

import './styles.scss';

export interface AlertDialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogBody: FC<AlertDialogBodyProps> = props => {
  const { children, ...rest } = props;
  const { getAlertDialogBodyProps } = useAlertDialog();

  return <div {...getAlertDialogBodyProps(rest)}>{children}</div>;
};

export default AlertDialogBody;

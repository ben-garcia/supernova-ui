import React from 'react';

import { useAlertDialog } from '../../../../hooks';

import './styles.scss';

export interface AlertDialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogBody: React.FC<AlertDialogBodyProps> = props => {
  const { children, ...rest } = props;
  const { getAlertDialogBodyProps } = useAlertDialog();

  return <div {...getAlertDialogBodyProps(rest)}>{children}</div>;
};

export default AlertDialogBody;

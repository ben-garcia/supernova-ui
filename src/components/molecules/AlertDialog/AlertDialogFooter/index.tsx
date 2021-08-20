import React from 'react';

import { useAlertDialog } from '../../../../hooks';

import './styles.scss';

export interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = props => {
  const { children, ...rest } = props;
  const { getAlertDialogFooterProps } = useAlertDialog();

  return <footer {...getAlertDialogFooterProps(rest)}>{children}</footer>;
};

export default AlertDialogFooter;
import React, { FC } from 'react';

import { useAlertDialog, useCSSAndPseudoClassProps } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the AlertDialog.
 */
const AlertDialogFooter: FC<AlertDialogFooterProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getAlertDialogFooterProps } = useAlertDialog();

  return (
    <footer {...getAlertDialogFooterProps({ ...addCSSClassesAndProps() })}>
      {children}
    </footer>
  );
};

export default AlertDialogFooter;

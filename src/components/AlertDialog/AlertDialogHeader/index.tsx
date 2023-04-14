import React, { FC } from 'react';

import { useAlertDialog, useCSSAndPseudoClassProps } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogHeader: FC<AlertDialogHeaderProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getAlertDialogHeaderProps } = useAlertDialog();

  return (
    <header {...getAlertDialogHeaderProps({ ...addCSSClassesAndProps() })}>
      {children}
    </header>
  );
};

export default AlertDialogHeader;

import React, { FC } from 'react';

import { useAlertDialog, useCSSAndPseudoClassProps } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogBodyProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogBody: FC<AlertDialogBodyProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getAlertDialogBodyProps } = useAlertDialog();

  return (
    <div {...getAlertDialogBodyProps({ ...addCSSClassesAndProps() })}>
      {children}
    </div>
  );
};

export default AlertDialogBody;

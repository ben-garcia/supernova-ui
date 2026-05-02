import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useAlertDialog } from '@hooks/use-alert-dialog';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogBodyProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogBody: FC<PropsWithChildren<AlertDialogBodyProps>> = props => {
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

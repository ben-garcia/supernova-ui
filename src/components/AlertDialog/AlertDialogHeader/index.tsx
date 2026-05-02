import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useAlertDialog } from '@hooks/use-alert-dialog';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogHeader: FC<
  PropsWithChildren<AlertDialogHeaderProps>
> = props => {
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

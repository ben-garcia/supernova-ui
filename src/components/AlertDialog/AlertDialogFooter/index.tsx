import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useAlertDialog } from '@hooks/use-alert-dialog';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the AlertDialog.
 */
const AlertDialogFooter: FC<
  PropsWithChildren<AlertDialogFooterProps>
> = props => {
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

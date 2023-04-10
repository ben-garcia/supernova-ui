import React, { FC } from 'react';

import {
  useAlertDialog,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface AlertDialogFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the AlertDialog.
 */
const AlertDialogFooter: FC<AlertDialogFooterProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const { getAlertDialogFooterProps } = useAlertDialog();

  return (
    <footer
      {...getAlertDialogFooterProps({ ...remainingProps, ...addClasses() })}
    >
      {children}
    </footer>
  );
};

export default AlertDialogFooter;

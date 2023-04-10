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

export interface AlertDialogHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogHeader: FC<AlertDialogHeaderProps> = props => {
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
  const { getAlertDialogHeaderProps } = useAlertDialog();

  return (
    <header
      {...getAlertDialogHeaderProps({ ...remainingProps, ...addClasses() })}
    >
      {children}
    </header>
  );
};

export default AlertDialogHeader;

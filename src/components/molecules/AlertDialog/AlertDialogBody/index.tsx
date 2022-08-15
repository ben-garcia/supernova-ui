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

export interface AlertDialogBodyProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the AlertDialog.
 */
const AlertDialogBody: FC<AlertDialogBodyProps> = props => {
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
  const { getAlertDialogBodyProps } = useAlertDialog();

  return (
    <div {...getAlertDialogBodyProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </div>
  );
};

export default AlertDialogBody;

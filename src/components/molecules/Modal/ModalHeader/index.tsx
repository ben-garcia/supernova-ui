import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useModal,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Modal.
 */
const ModalHeader: FC<ModalHeaderProps> = props => {
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
  const { getModalHeaderProps } = useModal();

  return (
    <header {...getModalHeaderProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </header>
  );
};

export default ModalHeader;

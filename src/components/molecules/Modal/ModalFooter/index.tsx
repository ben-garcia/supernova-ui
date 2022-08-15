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

export interface ModalFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Modal.
 */
const ModalFooter: FC<ModalFooterProps> = props => {
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
  const { getModalFooterProps } = useModal();

  return (
    <footer {...getModalFooterProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </footer>
  );
};

export default ModalFooter;

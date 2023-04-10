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

export interface ModalBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Modal.
 */
const ModalBody: FC<ModalBodyProps> = props => {
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
  const { getModalBodyProps } = useModal();

  return (
    <div {...getModalBodyProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </div>
  );
};

export default ModalBody;

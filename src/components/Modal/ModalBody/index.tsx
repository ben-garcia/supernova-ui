import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useModal } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Modal.
 */
const ModalBody: FC<ModalBodyProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getModalBodyProps } = useModal();

  return (
    <div {...getModalBodyProps({ ...addCSSClassesAndProps() })}>{children}</div>
  );
};

export default ModalBody;

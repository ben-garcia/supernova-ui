import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useModal } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Modal.
 */
const ModalFooter: FC<ModalFooterProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getModalFooterProps } = useModal();

  return (
    <footer {...getModalFooterProps({ ...addCSSClassesAndProps() })}>
      {children}
    </footer>
  );
};

export default ModalFooter;

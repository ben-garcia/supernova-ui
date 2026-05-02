import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useModal } from '@hooks/use-modal';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Modal.
 */
const ModalFooter: FC<PropsWithChildren<ModalFooterProps>> = props => {
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

import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useModal } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Modal.
 */
const ModalHeader: FC<ModalHeaderProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getModalHeaderProps } = useModal();

  return (
    <header {...getModalHeaderProps({ ...addCSSClassesAndProps() })}>
      {children}
    </header>
  );
};

export default ModalHeader;

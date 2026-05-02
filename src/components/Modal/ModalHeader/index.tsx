import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useModal } from '@hooks/use-modal';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Modal.
 */
const ModalHeader: FC<PropsWithChildren<ModalHeaderProps>> = props => {
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

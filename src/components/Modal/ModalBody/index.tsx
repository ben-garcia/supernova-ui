import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useModal } from '@hooks/use-modal';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface ModalBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Modal.
 */
const ModalBody: FC<PropsWithChildren<ModalBodyProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getModalBodyProps } = useModal();

  return (
    <div {...getModalBodyProps({ ...addCSSClassesAndProps() })}>{children}</div>
  );
};

export default ModalBody;

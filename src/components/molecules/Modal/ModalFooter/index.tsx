import React, { ReactNode } from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * The wrapper for the footer content of the Modal.
 */
const ModalFooter: React.FC<ModalFooterProps> = props => {
  const { children, ...rest } = props;
  const { getModalFooterProps } = useModal();

  return <footer {...getModalFooterProps(rest)}>{children}</footer>;
};

export default ModalFooter;

import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = props => {
  const { children, ...rest } = props;
  const { getModalFooterProps } = useModal();

  return <footer {...getModalFooterProps(rest)}>{children}</footer>;
};

export default ModalFooter;

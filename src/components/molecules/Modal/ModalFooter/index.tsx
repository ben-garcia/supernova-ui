import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = props => {
  const { children } = props;
  const { getModalFooterProps } = useModal();

  return <footer {...getModalFooterProps()}>{children}</footer>;
};

export default ModalFooter;

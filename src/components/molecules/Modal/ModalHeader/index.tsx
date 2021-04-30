import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

export interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = props => {
  const { children } = props;
  const { getModalHeaderProps } = useModal();

  return <header {...getModalHeaderProps()}>{children}</header>;
};

export default ModalHeader;

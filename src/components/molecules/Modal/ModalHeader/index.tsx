import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = props => {
  const { children } = props;
  const { id } = useModal();

  return (
    <header className="_snui-modal__header" id={`${id}-header`}>
      {children}
    </header>
  );
};

export default ModalHeader;

import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalFooterProps> = props => {
  const { children } = props;
  const { id } = useModal();

  return (
    <footer className="_snui-modal__footer" id={`${id}-footer`}>
      {children}
    </footer>
  );
};

export default ModalHeader;

import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalBodyProps> = props => {
  const { children } = props;
  const { id } = useModal();

  return (
    <div className="_snui-modal__body" id={`${id}-body`}>
      <div>{children}</div>
    </div>
  );
};

export default ModalHeader;

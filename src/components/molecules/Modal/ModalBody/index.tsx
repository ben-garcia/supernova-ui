import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = props => {
  const { children } = props;
  const { getModalBodyProps } = useModal();

  return (
    <div {...getModalBodyProps()}>
      <div>{children}</div>
    </div>
  );
};

export default ModalBody;

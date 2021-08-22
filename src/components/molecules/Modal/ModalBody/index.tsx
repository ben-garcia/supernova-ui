import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the main content of the Modal.
 */
const ModalBody: React.FC<ModalBodyProps> = props => {
  const { children, ...rest } = props;
  const { getModalBodyProps } = useModal();

  return <div {...getModalBodyProps(rest)}>{children}</div>;
};

export default ModalBody;

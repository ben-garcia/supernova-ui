import React from 'react';

import { useModal } from '../../../../hooks';

import './styles.scss';

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the header content of the Modal.
 */
const ModalHeader: React.FC<ModalHeaderProps> = props => {
  const { children, ...rest } = props;
  const { getModalHeaderProps } = useModal();

  return <header {...getModalHeaderProps(rest)}>{children}</header>;
};

export default ModalHeader;

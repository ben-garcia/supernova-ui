import React, { Children, cloneElement, useCallback, ReactNode } from 'react';

import { useModal } from '../../../../hooks';
import { isObject } from '../../../../utils';

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
  const { getModalFooterProps, onClose } = useModal();
  const handleOnClick = useCallback(() => onClose(), []);
  const enhancedChildren: ReactNode[] = [];

  // loop through the children
  // eslint-disable-next-line
  Children.toArray(children).map((child: any) => {
    // make sure the child is an object
    if (isObject(child)) {
      return child.props.children.forEach((c: any) => {
        if (c.props.onClick) {
          enhancedChildren.push(cloneElement(c, { onClick: handleOnClick }));
        } else {
          enhancedChildren.push(c);
          // enhancedChildren.push(cloneElement(c));
        }
      });
    }
  });

  return <footer {...getModalFooterProps(rest)}>{enhancedChildren}</footer>;
};

export default ModalFooter;

import React, { Children, cloneElement, useCallback, ReactNode } from 'react';

import { useAlertDialog } from '../../../../hooks';
import { isObject } from '../../../../utils';

import './styles.scss';

export interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The wrapper for the footer content of the AlertDialog.
 */
const AlertDialogFooter: React.FC<AlertDialogFooterProps> = props => {
  const { children, ...rest } = props;
  const { getAlertDialogFooterProps, onClose } = useAlertDialog();
  const handleOnClick = useCallback(() => onClose(), []);
  const enhancedChildren: ReactNode[] = [];

  // loop through the children
  // eslint-disable-next-line
  Children.toArray(children).map((child: any) => {
    // make sure the child is an object
    if (isObject(child) && Array.isArray(child.props.children)) {
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

  return (
    <footer {...getAlertDialogFooterProps(rest)}>
      {enhancedChildren.length ? enhancedChildren : children}
    </footer>
  );
};

export default AlertDialogFooter;

import React, { ReactNode } from 'react';

import { createClasses, isString } from '../../../utils';
import './styles.scss';

export interface OverlayProps {
  children: ReactNode;
  className?: string;
}

/**
 * UI component that is used to dim the background
 * to set the focus to its children.
 */
const Overlay: React.FC<OverlayProps> = props => {
  const { children, className } = props;
  const classes = createClasses('snui-overlay', {
    [`${className}`]: isString(className),
  });

  return <div className={classes}>{children}</div>;
};

export default Overlay;

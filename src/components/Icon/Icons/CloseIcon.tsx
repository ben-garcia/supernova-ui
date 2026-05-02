import React, { forwardRef } from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Close svg
 */
const CloseIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m2.5478 2.104 1.6602-1.6605-0.44359-0.44354-1.6604 1.6602-1.6604-1.6602-0.44359 0.44354 1.6604 1.6607-1.6604 1.6602 0.44359 0.44354 1.6604-1.6602 1.6604 1.6602 0.44359-0.44354z" />
    </Icon>
  );
});

export default CloseIcon;

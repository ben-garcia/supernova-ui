import React, { forwardRef } from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Chevron Right svg
 */
const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M 0.8007126,0 0,0.49444 2.600896,2.104 0,3.71356 0.8007126,4.208 4.208,2.104 Z" />
    </Icon>
  );
});

export default ChevronRightIcon;

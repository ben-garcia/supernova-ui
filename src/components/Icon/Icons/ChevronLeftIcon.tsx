import React, { forwardRef } from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Chevron Left svg
 */
const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M 4.208,0.49444 3.407287,0 0,2.104 3.407287,4.208 4.208,3.71356 1.6071039,2.104 Z" />
    </Icon>
  );
});

export default ChevronLeftIcon;

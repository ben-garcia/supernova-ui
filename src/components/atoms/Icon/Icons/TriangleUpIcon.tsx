import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Triangle up svg
 */
const TriangleUpIcon: React.FC<IconProps> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m3.0007 19h18c0.379 0 0.725-0.214 0.895-0.553 0.168-0.339 0.132-0.744-0.095-1.047l-9-12c-0.188-0.252-0.485-0.4-0.8-0.4s-0.611 0.148-0.8 0.4l-9 12c-0.228 0.303-0.264 0.708-0.095 1.047 0.17 0.339 0.516 0.553 0.895 0.553z" />
      </svg>
    </Icon>
  );
};

export default TriangleUpIcon;

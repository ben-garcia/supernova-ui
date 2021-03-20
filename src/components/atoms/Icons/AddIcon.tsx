import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Add svg
 */
const AddIcon: React.FC<Omit<IconProps, 'children'>> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 24 24">
        <path d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z" />
      </svg>
    </Icon>
  );
};

export default AddIcon;

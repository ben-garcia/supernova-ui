import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Edit svg
 */
const EditIcon: React.FC<IconProps> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.55 2.587l1.863 1.863a1.34 1.34 0 010 1.894l-1.64 1.64a.445.445 0 01-.631 0l-3.126-3.126a.447.447 0 010-.631l1.64-1.64a1.34 1.34 0 011.894 0zM9.753 5.49a.447.447 0 01.631 0l3.126 3.126a.447.447 0 010 .631l-7.63 7.63a.445.445 0 01-.315.13H2.44a.446.446 0 01-.446-.446v-3.126c0-.118.046-.232.13-.316l7.63-7.63z" />
      </svg>
    </Icon>
  );
};

export default EditIcon;

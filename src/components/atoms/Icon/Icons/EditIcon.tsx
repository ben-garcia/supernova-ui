import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Edit svg
 */
const EditIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m3.5673 0.11135 0.5293 0.52927a0.38071 0.38069 0 0 1 0 0.53808l-0.46595 0.46592a0.12643 0.12642 0 0 1-0.17928 0l-0.88814-0.88808a0.127 0.12699 0 0 1 0-0.17926l0.46595-0.46592a0.38071 0.38069 0 0 1 0.53811 0zm-1.3629 0.82473a0.127 0.12699 0 0 1 0.17928 0l0.88814 0.88808a0.127 0.12699 0 0 1 0 0.17926l-2.1678 2.1676a0.12643 0.12642 0 0 1-0.089496 0.036932h-0.88786a0.12671 0.12671 0 0 1-0.12671-0.12671v-0.88808c0-0.033523 0.013069-0.06591 0.036935-0.089774l2.1678-2.1676z" />
    </Icon>
  );
};

export default EditIcon;

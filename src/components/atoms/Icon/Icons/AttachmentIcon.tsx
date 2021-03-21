import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Attachment svg
 */
const AttachmentIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m3.8465 0.40576a1.2334 1.3848 0 0 0-1.7446 0l-1.8389 2.0643a0.90864 1.0201 0 0 0 1.285 1.4427l1.4935-1.6772a0.58349 0.65509 0 1 0-0.82465-0.92563l-0.91945 1.0313a0.17729 0.19904 0 1 0 0.25055 0.28169l0.91945-1.0327a0.22929 0.25742 0 0 1 0.32408 0.36405l-1.4941 1.6772a0.5543 0.62231 0 0 1-0.7839-0.88008l1.8389-2.0643a0.87931 0.9872 0 1 1 1.2435 1.3961l-1.3791 1.5483a0.17719 0.19893 0 1 0 0.25055 0.28129l1.3791-1.5485a1.2333 1.3846 0 0 0 0-1.9587z" />
    </Icon>
  );
};

export default AttachmentIcon;

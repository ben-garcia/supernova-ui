import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Search svg
 */
const SearchIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="M 3.452339,3.0490909 4.116731,3.6929614 A 0.29915777,0.29961729 0 1 1 3.7008885,4.1238041 L 3.0269369,3.4703593 A 1.9119196,1.9148564 0 1 1 3.452339,3.0490909 Z M 3.2252986,1.9217192 A 1.3024952,1.3044959 0 1 0 1.9251933,3.2238216 1.3024952,1.3044959 0 0 0 3.2252986,1.9217192 Z" />
    </Icon>
  );
};

export default SearchIcon;

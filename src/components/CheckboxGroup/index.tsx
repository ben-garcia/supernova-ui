import type { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import CheckboxGroupRoot from './CheckboxGroupRoot';
import { CheckboxGroupRootProps } from './types';
import CheckboxGroupItem from './CheckboxGroupItem';
import { CheckboxGroupItemProps } from './CheckboxGroupItem/types';

interface CheckboxGroupComponent {
  /**
   * UI component used as a wrapper for Checkbox components
   */
  Root: FC<PropsWithChildren<CheckboxGroupRootProps>>;
  /**
   * UI interactive component used to indicate that only one choice must
   * be selected of a given number of choices presented
   */
  Item: ForwardRefExoticComponent<CheckboxGroupItemProps>;
}

const CheckboxGroup: CheckboxGroupComponent = {
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
};

export default CheckboxGroup;

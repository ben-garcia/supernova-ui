import type { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import RadioGroupRoot from './RadioGroupRoot';
import { RadioGroupRootProps } from './types';
import RadioGroupItem from './RadioGroupItem';
import { RadioGroupItemProps } from './RadioGroupItem/types';

interface RadioGroupComponent {
  /**
   * UI component used as a wrapper for Radio components
   */
  Root: FC<PropsWithChildren<RadioGroupRootProps>>;
  /**
   * UI interactive component used to indicate that only one choice must
   * be selected of a given number of choices presented
   */
  Item: ForwardRefExoticComponent<RadioGroupItemProps>;
}

const RadioGroup: RadioGroupComponent = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};

export default RadioGroup;

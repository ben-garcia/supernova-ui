import { Dispatch, SetStateAction } from 'react';

import { SupernovaProps } from '@types';

/**
 * Props for the CheckboxGroupRoot component
 */
export interface CheckboxGroupRootProps extends SupernovaProps {
  /**
   * Configure the defaultValue Checkbox component to be checked by matching
   * this value to the value prop of one of it's children
   */
  defaultValue?: string[];
  /**
   * Name input prop assigned to each Radio component,
   * to indicate that all children elements are joined
   *
   * will override name prop from its children
   */
  name: string;
  /**
   * Function to be executed for onChange event
   *
   * when using as controlled component.
   *
   */
  onChange?: Dispatch<SetStateAction<string[]>>;
  /**
   * How the children should be positioned
   *
   * @default 'row'
   */
  orientation?: 'column' | 'row';
  /**
   * A string specifying the default value of the <input> element.
   * use when using controlled component.
   */
  value?: string[];
}

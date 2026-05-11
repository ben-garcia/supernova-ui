import { Dispatch, SetStateAction } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the RadioGroupRoot component
 */
export interface RadioGroupRootProps
  extends SupernovaProps, Pick<FormControlProps, 'colorVariant' | 'size'> {
  /**
   * Configure the defaultValue Radio component to be checked by matching
   * this value to the value prop of one of it's children
   */
  defaultValue?: string;
  /**
   * How the children should be positioned
   *
   * @default 'row'
   */
  orientation?: 'column' | 'row';
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
  onChange?: Dispatch<SetStateAction<string>>;
  /**
   * A string specifying the default value of the <input> element.
   * use when using controlled component.
   */
  value?: string;
}

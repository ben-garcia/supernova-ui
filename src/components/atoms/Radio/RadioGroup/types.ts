import { Dispatch, ReactNode, SetStateAction } from 'react';

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  children: ReactNode | ReactNode[];
  className?: string;
  /**
   * Configure the default Radio component to be checked by matching
   * this value to the value prop of one of it's children
   */
  defaultValue?: string;
  /**
   * How the children should be positioned
   *
   * @default 'row'
   */
  direction?: 'column' | 'row';
  /**
   * Name input prop assigned to each Radio component,
   * to indicate that all children elements are joined
   *
   * will override name prop from its children
   */
  name: string;
  /**
   * Function to be executed for onChange event
   */
  onChange?: Dispatch<SetStateAction<string>>;
}

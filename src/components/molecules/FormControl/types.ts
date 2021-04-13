import { ReactNode } from 'react';

/**
 * Props fro the FormControl component
 */
export interface FormControlProps {
  children: ReactNode;
  /**
   * id that will be shared across all the children
   */
  id?: string;
  /**
   * Whether the form field is disabled
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the form field should render an error text
   *
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Whether the form field is required
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * the html element to render
   *
   * @default 'div'
   */
  tag?: 'div' | 'fieldset';
}

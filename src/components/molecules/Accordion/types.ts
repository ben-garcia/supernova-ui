import { ReactNode } from 'react';

export interface AccordionProps {
  /**
   * Configure whether more than one item can be expanded.
   */
  allowMultiple?: boolean;
  /**
   * Configure whether an expanded item is collapsible.
   */
  allowToggle?: boolean;
  children: ReactNode;
  /**
   * Add a class
   */
  className?: string;
  /**
   * Configure the accordion panels that should render in the open state.
   */
  defaultIndices?: number[];
}

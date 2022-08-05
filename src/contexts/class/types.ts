import { MutableRefObject } from 'react';

export interface Class {
  /**
   * Name of the class.
   */
  className: string;
  /**
   * Number of elements using this class.
   */
  count: number;
  /*
   * The string that holds media query information.
   */
  styles: string;
}

export type ClassContextProps = MutableRefObject<Class[]>;

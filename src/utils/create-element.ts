import {
  ClassAttributes,
  InputHTMLAttributes,
  createElement as rcreateElement,
} from 'react';

type Params = Parameters<typeof rcreateElement>;

/**
 * Wrapper for React.createElement
 */
export const createElement = (
  element: Params[0],
  // props: Params[1],
  props: InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement>,
  children: Params[2]
) => rcreateElement(element, props, children);

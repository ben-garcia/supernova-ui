// Helper functions involving React.
import {
  ClassAttributes,
  InputHTMLAttributes,
  MutableRefObject,
  createElement as rcreateElement,
} from 'react';

/**
 * Merge multiple React refs in a single ref.
 *
 * @param 'refs' array of refs to merge.
 * @return function passed to React ref attribute.
 */
export function mergeRefs<T>(...refs: (T | MutableRefObject<T>)[]) {
  return (node: T) => {
    // @ts-ignore
    // eslint-disable-next-line
    for (const ref of refs) {
      if (ref) {
        // @ts-ignore
        ref.current = node;
      }
    }
  };
}

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

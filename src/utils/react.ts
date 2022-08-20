// Helper functions involving React.
import {
  ClassAttributes,
  ForwardedRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  MutableRefObject,
  createElement as rcreateElement,
  forwardRef as rforwardRef,
} from 'react';

export { createPortal } from 'react-dom';

export function forwardRef<TProps, TElement>(
  render: ForwardRefRenderFunction<TElement, TProps>
) {
  return rforwardRef<TElement, TProps>(render);
}

/**
 * Merge multiple React refs in a single ref.
 *
 * @param 'refs' array of refs to merge.
 * @return function passed to React ref attribute.
 */
export function mergeRefs<T>(
  ...refs: (T | MutableRefObject<T> | ForwardedRef<T>)[]
) {
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

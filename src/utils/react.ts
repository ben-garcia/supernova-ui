// Helper functions involving React.
import { MutableRefObject } from 'react';

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

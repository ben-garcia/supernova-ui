import { ClassAttributes, ForwardedRef, ForwardRefRenderFunction, InputHTMLAttributes, MutableRefObject, createElement as rcreateElement } from 'react';
export { createPortal } from 'react-dom';
export declare function forwardRef<TProps, TElement>(render: ForwardRefRenderFunction<TElement, TProps>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<TProps> & import("react").RefAttributes<TElement>>;
/**
 * Merge multiple React refs in a single ref.
 *
 * @param 'refs' array of refs to merge.
 * @return function passed to React ref attribute.
 */
export declare function mergeRefs<T>(...refs: (T | MutableRefObject<T> | ForwardedRef<T>)[]): (node: T) => void;
/**
 * Wrapper for React.Children.count
 */
export declare const getChildrenCount: (children: any) => number;
declare type Params = Parameters<typeof rcreateElement>;
/**
 * Wrapper for React.createElement
 */
export declare const createElement: (element: Params[0], props: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>, children: Params[2]) => import("react").ReactElement<{}, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=react.d.ts.map
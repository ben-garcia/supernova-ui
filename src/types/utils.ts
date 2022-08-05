import { HTMLAttributes as ReactHTMLAttributes } from 'react';

/**
 * Interactive HTML Elements.
 */
export type HTMLElements = 'button';

/**
 * Get all React HTML attributes for a particular element.
 */
export type HTMLAttributes<
  TypeElement extends HTMLElements
> = ReactHTMLAttributes<`HTML${Capitalize<TypeElement>}Element`>;

/**
 * Create a tuple with a length of 6.
 * Each element will be of type 'Type' or null.
 *
 * Used to create the responsive prop array.
 */
type NullableTuple<Type> = [
  Type | number | null,
  Type | number | null,
  Type | number | null,
  Type | number | null,
  Type | number | null,
  Type | number | null
];
/**
 * Add a 'NullableTuple' that accepts
 * the properties of Type
 *
 * Used to add responsive props to the CSSProps type
 */
export type WithResponsiveProps<Type extends object> = {
  [Property in keyof Type]:
    | Type[Property]
    | Partial<NullableTuple<Type[Property]>>;
};

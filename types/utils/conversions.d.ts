import { CSSProps, CSSPropsHyphen } from '@types';
interface AnyObject {
    [k: string]: any;
}
/**
 * creates an array out of the properties of the passed object
 *
 * @param object object to get the keys to use
 *
 * @returns array which contains all properties of object as strings
 */
export declare const objectToPropertiesArray: (object: AnyObject) => string[];
/**
 * construct camelcase css property
 *
 * @param innerProp the inner prop of the object
 * @param outerProp the outer prop of the object
 *
 * @return cssJsProperty the camelcase css property
 */
export declare const createCssJsProperty: (innerProp: string, outerProp: string) => string;
/**
 * The available colors provided by the theme
 */
export declare const colors: string[];
/**
 * The available radii provided by the theme
 */
export declare const radii: string[];
/**
 * The available shadows provided by the theme
 */
export declare const shadows: string[];
/**
 * The available sizes provided by the theme
 *
 * from smallest(xs) to largest(xxl)
 */
export declare const sizes: string[];
/**
 * Convert JS CSS properties object into an object with valid CSS.
 *
 * Example
 *     input => {backgroundColor: 'red', color: 'white'}
 *     output => {'background-color': 'red', color: 'white'}
 *
 * @param obj Javascript CSS object
 *
 * @returns CSS valid object.
 */
export declare const cssCamelCaseToHyphenated: (props: CSSProps) => CSSPropsHyphen;
/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export declare function valueToPercent(value: number, min: number, max: number): number;
/**
 * Decrease slider thumb's height or width from the current value; Decrease slider thumb's height or width from the current value.
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 * @param sliderThumb reference to the thumb element
 * @param orientation direction of the slider
 */
export declare function decreaseThumbFromValue(value: number, min: number, max: number, sliderThumb: HTMLElement | null, orientation: 'horizontal' | 'vertical'): string | 0;
/**
 * Add css prefixes.
 *
 * @param styles the styles to which prefixes will be added.
 *
 * @return styles with the added prefixes.
 */
export declare const addCSSPrefixes: (styles: string) => string;
export {};
//# sourceMappingURL=conversions.d.ts.map
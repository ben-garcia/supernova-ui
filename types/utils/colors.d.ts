/**
 * Convert hexidecimal color to rgb
 *
 * @param 'hex' hexidecimal color
 *
 * @return array containing [r, g, b] numberic values.
 */
export declare const hexToRgb: (hex: string) => number[];
/**
 * Convert hsl/a value to hexidecimal.
 *
 * @param 'h' hue
 * @param 's' saturation
 * @param 'l' ligntness
 * @param 'a' alpha
 *
 * @return converted hexidecimal value
 */
export declare function hslToHex(h: number, s: number, l: number, a?: number): string;
/**
 * Convert hsl value to rgb.
 *
 * @param 'h' hue
 * @param 's' saturation
 * @param 'l' ligntness
 *
 * @return converted hexidecimal value
 */
export declare const hslToRgb: (h2: number, s2: number, l2: number) => number[];
/**
 * Calculate whether the hex color is of a dark color.
 *
 * @param 'hex' hexidecimal color
 *
 * @return whether hex color is a dark color.
 */
export declare const isDarkColor: (hex: string) => boolean;
/**
 * Convert rgb color to Hex.
 *
 * @param 'r' red value
 * @param 'g' green value
 * @param 'b' blue value
 * @param 'a' alpha value
 *
 * @return converted hex value.
 */
export declare const rgbToHex: (r: number, g: number, b: number, a?: number | undefined) => string;
//# sourceMappingURL=colors.d.ts.map
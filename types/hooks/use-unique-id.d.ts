/**
 * React hooks that generates a unique string id.
 *
 * @param length number of characters to use for the id.
 *
 * @example
 * ```js
 * const id = useUniqueId();
 *
 * // id will be `snui-<alphanumeric-string>-<unique-number>`
 * ````
 */
export declare const useUniqueStringId: (length?: number) => string;
/**
 * React hooks to generate a unique id.
 *
 * @param prefix human readable identifier
 *
 * source
 * @see https://github.com/chakra-ui/chakra-ui/blob/main/packages/hooks/src/use-id.ts
 *
 * @example
 *
 * ```js
 * const buttonId = useUniqueId('button');
 *
 * // buttonId will be `button-<unique-number>`
 * ```
 */
export declare const useUniqueId: (prefix: string) => string;
/**
 * Reack hook to generate unique ids for for multiple components.
 *
 * @param primaryPrefix name of the parent component to be used.
 * @param prefixes array of prefixes to use
 *
 * source
 * @see https://github.com/chakra-ui/chakra-ui/blob/main/packages/hooks/src/use-id.ts
 *
 * @example
 *
 * ```js
 * const [buttonId, panelId] = useUniqueIds('accordion-1', 'button', 'panel')
 *
 * // buttonId will be in the form `accordion-1-button-<unique-number>`
 * // panelId will be in the form `accordion-1-panel-<unique-number>`
 * ```
 */
export declare const useUniqueIds: (primaryPrefix: string, ...prefixes: string[]) => string[];
//# sourceMappingURL=use-unique-id.d.ts.map
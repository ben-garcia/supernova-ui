import { useContext, useMemo } from 'react';

import { IdContext } from '../contexts';

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
 * const buttonId = useId('button');
 *
 * // buttonId will be `button-<unique-number>`
 * ```
 */
export const useUniqueId = (prefix: string) => {
  const context = useContext(IdContext);

  // eslint-disable-next-line
  return useMemo(() => `${prefix}-${++context!.count}`, [prefix]);
};

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
 * const [buttonId, panelId] = useIds('accordion-1', 'button', 'panel')
 *
 * // buttonId will be in the form `accordion-1-button-<unique-number>`
 * // panelId will be in the form `accordion-1-panel-<unique-number>`
 * ```
 */
export const useUniqueIds = (primaryPrefix: string, ...prefixes: string[]) => {
  const ids = prefixes.map(prefix => {
    // get a unique id
    const id = useUniqueId(prefix);

    return `${primaryPrefix}__${id}`;
  });

  return useMemo(() => ids, [primaryPrefix, prefixes]);
};

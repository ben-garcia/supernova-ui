import { ReactNode } from 'react';
/**
 * Represents any object.
 *
 * used to pass a custom theme to the SupernovaProvider.
 */
declare type AnyRecord = Record<string, any>;
export interface SupernovaProviderProps {
    children: ReactNode;
    /**
     * a custom them object or the default object.
     *
     * ThemeProviderProps['theme']
     */
    theme?: AnyRecord;
}
export {};
//# sourceMappingURL=types.d.ts.map
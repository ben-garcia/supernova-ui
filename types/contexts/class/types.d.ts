import { MutableRefObject } from 'react';
export interface Class {
    /**
     * Name of the class.
     */
    className: string;
    /**
     * Number of elements using this class.
     */
    count: number;
    styles: string;
}
export declare type ClassContextProps = MutableRefObject<Class[]>;
//# sourceMappingURL=types.d.ts.map
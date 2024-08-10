interface ClassesToAdd {
    [k: string]: boolean;
}
/**
 * React hooks that concatenates all the necessary classes into a string
 *
 * @param 'initialClass' first class in the result string.
 * @param 'classesToAdd' object of classes to add.
 */
export declare const useCreateClassString: (initialClass: string, classesToAdd: ClassesToAdd) => () => {
    className: string;
};
export {};
//# sourceMappingURL=use-create-class.d.ts.map
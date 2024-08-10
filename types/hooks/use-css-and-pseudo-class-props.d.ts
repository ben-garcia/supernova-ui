interface ClassesToAdd {
    [k: string]: boolean;
}
/**
 * React hook to validate and inject CSS and Pseudo class props.
 */
export declare const useCSSAndPseudoClassProps: (props: any, initialClass: string, classesToAdd?: ClassesToAdd | undefined) => () => {
    className: string;
};
export {};
//# sourceMappingURL=use-css-and-pseudo-class-props.d.ts.map
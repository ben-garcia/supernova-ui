import { ColorVariant } from '@types';
/**
 * React hook to convert colorVariant prop to inline React style prop.
 */
export declare const useInlineStyles: (colorVariant: ColorVariant | undefined) => () => {
    style: {
        background: string;
        color: string;
    } | undefined;
};
//# sourceMappingURL=use-inline-styles.d.ts.map
import { FormControlProps, SupernovaProps } from '@types';
/**
 * Props for the Tag component
 */
export interface TagProps extends SupernovaProps, Pick<FormControlProps, 'colorVariant' | 'size'> {
    /**
     * Configure the look of the Tag.
     *
     * @default 'solid'
     */
    variant?: 'outline' | 'solid';
}
//# sourceMappingURL=types.d.ts.map
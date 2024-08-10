import { FormControlProps, SupernovaProps } from '@types';
/**
 * Props for the Spinner component
 */
export interface SpinnerProps extends SupernovaProps, Pick<FormControlProps, 'colorVariant'> {
    /**
     * The thickness of the border
     *
     * @default '4px'
     */
    borderThickness?: string;
    /**
     * How long the animation will last
     *
     * @default '1s'
     */
    duration?: string;
    /**
     * The color of the spinner
     *
     * @default 'info700'
     */
    primaryColor?: string;
    /**
     * The color for the empty space
     *
     * @default 'transparent'
     */
    secondaryColor?: string;
    /**
     * size of the component
     */
    size?: FormControlProps['size'] | 'xs' | 'xl' | 'xxl' | 'xxxl';
}
//# sourceMappingURL=types.d.ts.map
import { FormControlProps, SupernovaProps } from '@types';
/**
 * The props used by the Heading component
 */
export interface HeadingProps extends SupernovaProps {
    /**
     * The html heading level(1, 2, 3, 4, 5, 6)
     *
     * default is 1
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * The size of the component.
     */
    size?: FormControlProps['size'] | 'xl' | 'xxl' | 'xxxl';
}
//# sourceMappingURL=types.d.ts.map
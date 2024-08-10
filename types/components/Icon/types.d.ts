/**
 * Props for the Icon component
 */
export interface IconBaseProps {
    /**
     * class to add
     */
    className?: string;
    /**
     * fill for the componenet
     */
    color?: string;
    /**
     * height HTML attribute
     */
    height?: string;
    /**
     * padding HTML attribute
     */
    padding?: string;
    /**
     * margin HTML attribute
     */
    margin?: string;
    /**
     * size of the component
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    /**
     * The svg viewbox
     */
    viewBox?: string;
    /**
     * width HTML attribute
     */
    width?: string;
}
/**
 * Props for the specific icon components
 */
export interface IconProps extends Omit<IconBaseProps, 'children'> {
}
//# sourceMappingURL=types.d.ts.map
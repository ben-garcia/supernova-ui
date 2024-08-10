import { FormControlProps, SupernovaProps } from '@types';
/**
 * Props for the Textarea component
 */
export interface TextareaProps extends SupernovaProps<'textarea'>, Omit<FormControlProps, 'size'> {
    /**
     * The HTML label to be associated with the textarea.
     */
    label?: string;
    /**
     * The height should be determined by the content.
     *
     * @default true
     */
    isAutoResize?: boolean;
}
//# sourceMappingURL=types.d.ts.map
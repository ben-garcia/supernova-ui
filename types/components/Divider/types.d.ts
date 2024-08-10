import { FormControlProps, SupernovaProps } from '@types';
export interface DividerProps extends SupernovaProps, Pick<FormControlProps, 'colorVariant' | 'size'> {
    /**
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
}
//# sourceMappingURL=types.d.ts.map
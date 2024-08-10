import { FormControlProps, SupernovaProps } from '@types';
export interface SliderProps extends SupernovaProps, Pick<FormControlProps, 'size'> {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaLabelledBy?: string;
    ariaValueText?: string;
    max?: number;
    min?: number;
    onChange: (newValue: number) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number;
    value: number;
}
//# sourceMappingURL=types.d.ts.map
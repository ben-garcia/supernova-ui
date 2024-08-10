import { ReactNode } from 'react';
export interface SliderContextProps {
    ariaDescribedBy: string | undefined;
    ariaLabel: string | undefined;
    ariaLabelledBy: string | undefined;
    ariaValueText: string | undefined;
    max: number;
    min: number;
    onChange: (newValue: number) => void;
    orientation: 'horizontal' | 'vertical';
    size: 'sm' | 'md' | 'lg';
    sliderId: string;
    step: number;
    value: number;
}
export interface SliderProviderProps {
    children: ReactNode;
    value: SliderContextProps;
}
//# sourceMappingURL=types.d.ts.map
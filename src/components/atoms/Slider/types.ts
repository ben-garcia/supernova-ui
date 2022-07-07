import { ReactNode } from 'react';

export interface SliderProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaValueText?: string;
  children: ReactNode;
  className?: string;
  max?: number;
  min?: number;
  onChange: (newValue: number) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  step?: number;
  value: number;
}

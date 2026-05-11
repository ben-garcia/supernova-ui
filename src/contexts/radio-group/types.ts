import { ChangeEventHandler } from 'react';

export interface RadioGroupContextProps {
  colorVariant: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  size: string;
  value: string | undefined;
}

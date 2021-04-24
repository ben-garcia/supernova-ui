import { ReactNode } from 'react';

export interface Menu {
  id: string;
  closeOnEsc?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: Menu;
}

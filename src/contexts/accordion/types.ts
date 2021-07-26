import { ReactNode } from 'react';

export interface Accordion {
  activeIndices: number[];
  allowMultiple?: boolean;
  allowToggle?: boolean;
  getAccordionPanelProps: () => void;
  setActiveIndices: (newIndices: number[]) => void;
}

export interface AccordionItem {
  getAccordionButtonProps: () => void;
  getAccordionItemProps: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface AccordionProviderProps {
  children: ReactNode;
  value: Accordion;
}

export interface AccordionItemProviderProps {
  children: ReactNode;
  value: AccordionItem;
}

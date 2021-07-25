import { ReactNode } from 'react';

export interface Accordion {
  allowMultiple?: boolean;
  allowToggle?: boolean;
  activeIndex: number[];
  getAccordionButtonProps: () => void;
  getAccordionPanelProps: () => void;
  setActiveIndex: (newIndex: number[]) => void;
}

export interface AccordionItem {
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

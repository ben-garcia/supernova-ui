import { ReactNode } from 'react';
export interface Accordion {
    accordionId: string;
    activeIndices: number[];
    allowMultiple: boolean;
    allowToggle: boolean;
    buttonsRef: HTMLButtonElement[] | null;
    getAccordionPanelProps: () => void;
    defaultIndices: number[];
    focusedIndex: number;
    setActiveIndices: (newIndices: number[]) => void;
    setFocusedIndex: (newIndex: number) => void;
}
export interface AccordionItem {
    accordionButtonId: string;
    accordionPanelId: string;
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
//# sourceMappingURL=types.d.ts.map
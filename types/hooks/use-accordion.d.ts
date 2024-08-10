import { AccordionProps } from '@components/Accordion/types';
/**
 * Hook that returns the Accordion props
 */
export declare const useAccordionProvider: (props: Omit<AccordionProps, 'children'>) => {
    activeIndices: number[];
    getAccordionPanelProps: (accordionItemProps?: any) => any;
    setActiveIndices: (newIndex: number[]) => void;
};
/**
 * Hook that returns the Accordion Item props
 */
export declare const useAccordionItemProvider: () => {
    getAccordionButtonProps: (accordionButtonProps?: any) => any;
    getAccordionItemProps: (accordionItemProps?: any) => any;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};
/**
 * Hook that returns all accordion props
 */
export declare const useAccordion: () => import("@contexts").Accordion;
export declare const useAccordionItem: () => import("@contexts").AccordionItem;
//# sourceMappingURL=use-accordion.d.ts.map
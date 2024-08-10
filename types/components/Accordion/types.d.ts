import { SupernovaProps } from '@types';
export interface AccordionProps extends SupernovaProps {
    /**
     * Configure whether more than one item can be expanded.
     *
     * @default false
     */
    allowMultiple?: boolean;
    /**
     * Configure whether an expanded item is collapsible.
     *
     * @default false
     */
    allowToggle?: boolean;
    /**
     * Configure the accordion panels that should render in the open state.
     */
    defaultIndices?: number[];
}
//# sourceMappingURL=types.d.ts.map
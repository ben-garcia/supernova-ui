import { MutableRefObject } from 'react';
import { FloatingPlacement } from '@types';
/**
 * React hook that handles the logic to calculate the position
 *  of the Floating component.
 *
 *  @param placement where the Floating component will
 *                    render relative to the trigger element.
 *  @param withArrow flag to indicate whether to render with arrow.
 *  @param arrowSize the size of the arrow.
 *  @param spacing the gap between the trigger element and arrow/Floating.
 *  @param triggerElement the element which the Floating component will be
 *                        relative to.
 *  @param tooltipRef reference to the Floating component.
 *  @param arrowRef reference to the arrow element.
 *  @param arrowColor color of the arrow.
 */
export declare function useCalculatePosition(placement: FloatingPlacement, withArrow: boolean, arrowSize: number, spacing: number, triggerElement: HTMLElement, tooltipRef: MutableRefObject<HTMLDivElement | null>, arrowRef: MutableRefObject<HTMLDivElement | null>, arrowColor: string): {
    addElementStyles: () => {
        ref: MutableRefObject<HTMLDivElement | null>;
        style: {
            transform: string;
        };
    };
    addArrowStyles: () => {
        className: string;
        ref: MutableRefObject<HTMLDivElement | null>;
        style: {
            height: string;
            transform: string;
            width: string;
        };
    };
    calcPosition: () => void;
    calculateTransformOrigin: () => {
        style: {
            transformOrigin: string;
        };
    };
};
//# sourceMappingURL=use-calculate-position.d.ts.map
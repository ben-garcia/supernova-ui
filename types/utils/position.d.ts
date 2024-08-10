import { FloatingPlacement } from '@types';
export declare function calculateArrowPosition(pos: FloatingPlacement, arrowEl: HTMLElement, toolEl: HTMLElement): {
    left: string;
    top: string;
};
export declare function handlePos(position: FloatingPlacement, withArrow: boolean, arrowSize: number, spacing: number, triggerElement: HTMLElement, tooltipElement: HTMLElement): {
    finalPosition: FloatingPlacement;
    tooltip: {
        left: number;
        top: number;
    };
};
export declare function calcTransformOrigin(pos: FloatingPlacement): "center bottom" | "left bottom" | "right bottom" | "left top" | "right top" | "right center" | "left center" | "center top";
//# sourceMappingURL=position.d.ts.map
import { MutableRefObject, useCallback, useEffect, useState } from 'react';

import { ArrowPosition, FloatingPlacement } from '@types';
import {
  addArrowClasses,
  calculateArrowInlineStyles,
  calculateArrowPosition,
  calcTransformOrigin,
  handlePos,
} from '@utils';

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
export function useCalculatePosition(
  placement: FloatingPlacement,
  withArrow: boolean,
  arrowSize: number,
  spacing: number,
  triggerElement: HTMLElement,
  tooltipRef: MutableRefObject<HTMLDivElement | null>,
  arrowRef: MutableRefObject<HTMLDivElement | null>,
  arrowColor: string
) {
  const [pos, setPos] = useState({ left: -100, top: -100 });
  const [arrowPos, setArrowPos] = useState<ArrowPosition>({});
  const [finalPos, setFinalPos] = useState(placement);
  const [calcPos, setCalcPos] = useState(false);
  const handlePosition = useCallback(handlePos, []);
  useEffect(() => {
    if (withArrow && arrowRef.current && tooltipRef.current) {
      setArrowPos(
        calculateArrowPosition(
          finalPos,
          arrowRef.current,
          tooltipRef.current
        ) as any
      );
    }
  }, [withArrow, arrowRef.current, finalPos, tooltipRef.current]);
  useEffect(() => {
    if (calcPos && tooltipRef.current && triggerElement) {
      const { finalPosition, tooltip } = handlePosition(
        placement,
        withArrow,
        arrowSize,
        spacing,
        triggerElement,
        tooltipRef.current
      );
      setPos(tooltip);
      setFinalPos(finalPosition);
    }
    return () => {
      if (calcPos) {
        setCalcPos(false);
      }
    };
  }, [
    calcPos,
    placement,
    withArrow,
    arrowSize,
    spacing,
    triggerElement,
    tooltipRef.current,
  ]);
  const calcPosition = useCallback(() => {
    setCalcPos(true);
  }, []);
  const addElementStyles = useCallback(() => {
    return {
      ref: tooltipRef,
      style: {
        transform: `translate3d(${pos.left}px, ${pos.top}px, 0px)`,
      },
    };
  }, [pos, tooltipRef.current]);
  const addArrowStyles = useCallback(
    () => ({
      className: addArrowClasses(finalPos as FloatingPlacement),
      ref: arrowRef,
      style: {
        transform: `translate3d(${arrowPos.left}px, ${arrowPos.top}px, 0px)`,
        ...calculateArrowInlineStyles(arrowSize),
      },
    }),
    [arrowPos, arrowSize, finalPos, arrowRef, arrowColor]
  );
  const calculateTransformOrigin = useCallback(
    () => ({
      style: { transformOrigin: calcTransformOrigin(finalPos) },
    }),
    [finalPos]
  );

  return {
    addElementStyles,
    addArrowStyles,
    calcPosition,
    calculateTransformOrigin,
  };
}

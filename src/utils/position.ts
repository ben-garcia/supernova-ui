/**
 * This file contains functions that help calculate
 * an elements position relative to another.
 *
 * for use in the Tooltip component
 *
 * credit
 * @see https://github.com/salimd83/bookslib/blob/main/src/ui/Tooltip.js
 */

/**
 * The possible options for the Tooltip position
 */
type PositionType = 'bottom' | 'left' | 'right' | 'top';

/**
 * interface that represents the dimensions of the viewport
 */
interface ViewportBox {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

/**
 * Inteface that represents the point object
 */
interface Point {
  left: number | null;
  top: number | null;
  reset(p: Pick<ViewportBox, 'left' | 'top'>): void;
  restrictRect(rect: ViewportBox): void;
}

/**
 * Function that return object with properties that help
 * to describe the position of an element.
 */
export const getPosition = (position: PositionType) => ({
  /**
   * the position of the element
   */
  position,
  /**
   * Get the opposite of the current position
   *
   * for example,
   * if the position is 'bottom' when this method returns 'top'
   *
   * @return PositionType
   */
  negate() {
    switch (this.position) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      case 'top':
        return 'bottom';
      default:
        return 'top';
    }
  },
  /**
   * Whether position is either 'left' or 'right'
   *
   * @return if position is horizontal
   */
  isHorizontal(): boolean {
    return this.position === 'left' || this.position === 'right';
  },
  /**
   * Whether position is either 'bottom' or 'top'
   *
   * @return if position is vertical
   */
  isVertical(): boolean {
    return this.position === 'bottom' || this.position === 'top';
  },
});

/**
 * Function that return object with properties that help
 * to describe the left and top positions of an element.
 */
export const point = (): Point => ({
  left: null,
  top: null,
  reset(p: Pick<ViewportBox, 'left' | 'top'>) {
    this.left = p.left;
    this.top = p.top;
  },
  restrictRect(rect: ViewportBox) {
    if (this.left! < rect.left) {
      this.left = rect.left;
    } else if (this.left! > rect.right) {
      this.left = rect.right;
    }
    if (this.top! < rect.top) {
      this.top = rect.top;
    } else if (this.top! > rect.bottom) {
      this.top = rect.bottom;
    }
  },
});

/**
 * Calcuate the left and top properties
 *
 * @param triggerElement reference to the element that triggers the tooltip
 * @param tooltipElement reference to the tooltip element
 * @param postion current position of the tooltip
 */
export const getLeftTopPosition = (
  triggerElement: HTMLElement,
  tooltipElement: HTMLElement,
  position: PositionType
) => {
  if (tooltipElement) {
    let recurCount = 0;
    const pt = point();
    const space = 10;
    // viewport dimensions which will make the tooltip visible
    const boundary: ViewportBox = {
      bottom: window.innerHeight - (tooltipElement.clientHeight + space),
      left: space,
      right: document.body.clientWidth - (tooltipElement.clientWidth + space),
      top: space,
    };
    const { bottom, left, right, top } = triggerElement.getBoundingClientRect();

    return (function recursive(currentPosition: PositionType) {
      recurCount += 1;

      const pos = getPosition(currentPosition);

      switch (pos.position) {
        case 'left':
          pt.left = left - (tooltipElement.offsetWidth + space);
          pt.top =
            top +
            (triggerElement.offsetHeight - tooltipElement.offsetHeight) / 2;
          break;
        case 'right':
          pt.left = right + space;
          pt.top =
            top +
            (triggerElement.offsetHeight - tooltipElement.offsetHeight) / 2;
          break;
        case 'top':
          pt.left =
            left +
            (triggerElement.offsetWidth - tooltipElement.offsetWidth) / 2;
          pt.top = top - (tooltipElement.offsetHeight + space);
          break;
        default:
          pt.left =
            left +
            (triggerElement.offsetWidth - tooltipElement.offsetWidth) / 2;
          pt.top = bottom + space;
      }

      if (recurCount < 3)
        if (
          (pos.isHorizontal() &&
            (pt.left! < boundary.left || pt.left! > boundary.right)) ||
          (pos.isVertical() &&
            (pt.top! < boundary.top || pt.top! > boundary.bottom))
        ) {
          pt.reset(recursive(pos.negate()) as any);
        }

      // make sure the tooltip doesn't go outside the boundary
      pt.restrictRect(boundary);

      return pt;
    })(position);
  }

  // place the tooltip outside the viewport
  return { left: -100, top: -100 };
};

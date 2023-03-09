import { ArrowPosition, FloatingPlacement } from '@types';

function calculatePosition(
  pos: FloatingPlacement,
  withArrow: boolean,
  arrowSize: number,
  spacing: number,
  triggerRect: DOMRect,
  toolRect: DOMRect
) {
  const margin = withArrow ? (arrowSize / 2) * 1.4 + spacing : spacing;
  const newPos = {
    left: -100,
    top: -100,
  };
  if (pos === 'bottom-end') {
    newPos.left =
      window.scrollX + triggerRect.left + triggerRect.width - toolRect.width;
    newPos.top = window.scrollY + triggerRect.top + triggerRect.height + margin;
  } else if (pos === 'bottom-start') {
    newPos.left = window.scrollX + triggerRect.left;
    newPos.top = window.scrollY + triggerRect.top + triggerRect.height + margin;
  } else if (pos === 'top') {
    newPos.left =
      window.scrollX +
      triggerRect.left +
      (triggerRect.width - toolRect.width) / 2;
    newPos.top = window.scrollY + triggerRect.top - toolRect.height - margin;
  } else if (pos === 'top-start') {
    newPos.left = window.scrollX + triggerRect.left;
    newPos.top = window.scrollY + triggerRect.top - toolRect.height - margin;
  } else if (pos === 'top-end') {
    newPos.left =
      window.scrollX + triggerRect.left + triggerRect.width - toolRect.width;
    newPos.top = window.scrollY + triggerRect.top - toolRect.height - margin;
  } else if (pos === 'left') {
    newPos.left = window.scrollX + triggerRect.left - toolRect.width - margin;
    newPos.top =
      window.scrollY +
      triggerRect.top +
      (triggerRect.height - toolRect.height) / 2;
  } else if (pos === 'left-end') {
    newPos.left = window.scrollX + triggerRect.left - toolRect.width - margin;
    newPos.top = window.scrollY + triggerRect.bottom - toolRect.height;
  } else if (pos === 'left-start') {
    newPos.left = window.scrollX + triggerRect.left - toolRect.width - margin;
    newPos.top = window.scrollY + triggerRect.top;
  } else if (pos === 'right') {
    newPos.left = window.scrollX + triggerRect.right + margin;
    newPos.top =
      window.scrollY +
      triggerRect.top +
      (triggerRect.height - toolRect.height) / 2;
  } else if (pos === 'right-start') {
    newPos.left = window.scrollX + triggerRect.right + margin;
    newPos.top = window.scrollY + triggerRect.top;
  } else if (pos === 'right-end') {
    newPos.left = window.scrollX + triggerRect.right + margin;
    newPos.top = window.scrollY + triggerRect.bottom - toolRect.height;
  } else {
    newPos.left =
      window.scrollX +
      triggerRect.left +
      (triggerRect.width - toolRect.width) / 2;
    newPos.top = window.scrollY + triggerRect.top + triggerRect.height + margin;
  }

  return {
    left: Math.round(newPos.left),
    top: Math.round(newPos.top),
  };
}

function isNumber(val: any) {
  return Object.prototype.toString.call(val) === '[object Number]';
}

export function calculateArrowPosition(
  pos: FloatingPlacement,
  arrowEl: HTMLElement,
  toolEl: HTMLElement
) {
  const arrowBox = arrowEl.getBoundingClientRect();
  const toolBox = toolEl.getBoundingClientRect();
  const arrowPos: ArrowPosition = {};
  if (pos === 'bottom-end') {
    arrowPos.right = arrowBox.width / 2;
    arrowPos.top = -arrowBox.height;
  } else if (pos === 'bottom-start') {
    arrowPos.left = arrowBox.width / 2;
    arrowPos.top = -arrowBox.height;
  } else if (pos === 'top') {
    arrowPos.left = -arrowBox.width / 2 + toolBox.width / 2;
    arrowPos.bottom = -arrowBox.height;
  } else if (pos === 'top-start') {
    arrowPos.left = arrowBox.width / 2;
    arrowPos.bottom = -arrowBox.height;
  } else if (pos === 'top-end') {
    arrowPos.right = arrowBox.width / 2;
    arrowPos.bottom = -arrowBox.height;
  } else if (pos === 'left') {
    arrowPos.right = -arrowBox.width;
    arrowPos.top = toolBox.height / 2 - arrowBox.height / 2;
  } else if (pos === 'left-end') {
    arrowPos.right = -arrowBox.width;
    arrowPos.bottom = arrowBox.height / 2;
  } else if (pos === 'left-start') {
    arrowPos.right = -arrowBox.width;
    arrowPos.top = arrowBox.height / 2;
  } else if (pos === 'right') {
    arrowPos.left = -arrowBox.width;
    arrowPos.top = toolBox.height / 2 - arrowBox.height / 2;
  } else if (pos === 'right-start') {
    arrowPos.left = -arrowBox.width;
    arrowPos.top = arrowBox.height / 2;
  } else if (pos === 'right-end') {
    arrowPos.left = -arrowBox.width;
    arrowPos.bottom = arrowBox.height / 2;
  } else {
    arrowPos.left = -arrowBox.width / 2 + toolBox.width / 2;
    arrowPos.top = -arrowBox.height;
  }

  // return as numbers with 2 decimal places.
  return {
    bottom: isNumber(arrowPos.bottom)
      ? Number((arrowPos.bottom as number).toFixed(2))
      : undefined,
    left: isNumber(arrowPos.left)
      ? Number((arrowPos.left as number).toFixed(2))
      : undefined,
    right: isNumber(arrowPos.right)
      ? Number((arrowPos.right as number).toFixed(2))
      : undefined,
    top: isNumber(arrowPos.top)
      ? Number((arrowPos.top as number).toFixed(2))
      : undefined,
  };
}

function negatePosition(pos: FloatingPlacement) {
  let value: FloatingPlacement = 'top';
  if (pos === 'top') {
    value = 'bottom';
  } else if (pos === 'top-start') {
    value = 'bottom-start';
  } else if (pos === 'top-end') {
    value = 'bottom-end';
  } else if (pos === 'bottom-start') {
    value = 'top-start';
  } else if (pos === 'bottom-end') {
    value = 'top-end';
  } else if (pos === 'left') {
    value = 'right';
  } else if (pos === 'left-end') {
    value = 'right-end';
  } else if (pos === 'left-start') {
    value = 'right-start';
  } else if (pos === 'right-end') {
    value = 'left-end';
  } else if (pos === 'right') {
    value = 'left';
  } else if (pos === 'right-start') {
    value = 'left-start';
  }
  return value;
}

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
const getPosition = (position: FloatingPlacement) => ({
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
    return negatePosition(this.position);
  },
  /**
   * Whether position is either 'left' or 'right'
   *
   * @return if position is horizontal
   */
  isHorizontal(): boolean {
    return (
      this.position === 'left' ||
      this.position === 'right' ||
      this.position === 'left-start' ||
      this.position === 'right-start' ||
      this.position === 'left-end' ||
      this.position === 'right-end'
    );
  },
  /**
   * Whether position is either 'bottom' or 'top'
   *
   * @return if position is vertical
   */
  isVertical(): boolean {
    return (
      this.position === 'top' ||
      this.position === 'bottom' ||
      this.position === 'top-start' ||
      this.position === 'top-end' ||
      this.position === 'bottom-start' ||
      this.position === 'bottom-end'
    );
  },
});

/**
 * Function that return object with properties that help
 * to describe the left and top positions of an element.
 */
const point = (): Point => ({
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

export function handlePos(
  position: FloatingPlacement,
  withArrow: boolean,
  arrowSize: number,
  spacing: number,
  triggerElement: HTMLElement,
  tooltipElement: HTMLElement
) {
  const positionValues: {
    finalPosition: FloatingPlacement;
    tooltip: { left: number; top: number };
  } = { finalPosition: position, tooltip: { left: -200, top: -200 } };
  if (tooltipElement) {
    let recurCount = 0;
    let finalPosition = position;
    const pt = point();
    // viewport dimensions which will make the tooltip visible
    // important to include scrolling in the calculation.
    const boundary: ViewportBox = {
      bottom:
        window.scrollY +
        window.innerHeight -
        (tooltipElement.clientHeight + spacing),
      left: spacing,
      right:
        window.scrollX +
        document.body.clientWidth -
        (tooltipElement.clientWidth + spacing),
      top: spacing,
    };
    const triggerRect = triggerElement.getBoundingClientRect();
    const toolRect = tooltipElement.getBoundingClientRect();

    const tooltip = (function recursive(currentPosition: FloatingPlacement) {
      recurCount += 1;
      finalPosition = currentPosition;
      const pos = getPosition(currentPosition);
      const { left, top } = calculatePosition(
        currentPosition,
        withArrow,
        arrowSize,
        spacing,
        triggerRect,
        toolRect
      );
      pt.left = left;
      pt.top = top;

      if (recurCount < 3)
        if (
          (pos.isHorizontal() &&
            (pt.left! < boundary.left || pt.left! > boundary.right)) ||
          (pos.isVertical() &&
            (pt.top! < boundary.top || pt.top! > boundary.bottom))
        ) {
          pt.reset(recursive(pos.negate()));
        }
      // make sure the tooltip doesn't go outside the boundary
      pt.restrictRect(boundary);
      return { left: pt.left, top: pt.top };
    })(position);
    positionValues.tooltip = tooltip;
    positionValues.finalPosition = finalPosition;
  }
  return positionValues;
}

export function addArrowClasses(pos: FloatingPlacement) {
  let classes = 'snui snui-floating__arrow snui-floating__arrow--up';
  if (pos === 'top' || pos === 'top-start' || pos === 'top-end') {
    classes = 'snui snui-floating__arrow snui-floating__arrow--down';
  } else if (pos === 'right' || pos === 'right-start' || pos === 'right-end') {
    classes = 'snui snui-floating__arrow snui-floating__arrow--left';
  } else if (pos === 'left' || pos === 'left-start' || pos === 'left-end') {
    classes = 'snui snui-floating__arrow snui-floating__arrow--right';
  }
  return classes;
}

export function calculcateArrowInlineStyles(
  pos: FloatingPlacement,
  arrowSize: number,
  arrowColor: string = '#4d5665'
) {
  const size = (arrowSize / 2) * 1.4;
  if (pos === 'top' || pos === 'top-start' || pos === 'top-end') {
    return {
      borderLeftWidth: size,
      borderRightWidth: size,
      borderTopWidth: size,
      borderTopColor: arrowColor,
    };
  }
  if (pos === 'right' || pos === 'right-start' || pos === 'right-end') {
    return {
      borderBottomWidth: size,
      borderRightWidth: size,
      borderTopWidth: size,
      borderRightColor: arrowColor,
    };
  }
  if (pos === 'left' || pos === 'left-start' || pos === 'left-end') {
    return {
      borderBottomWidth: size,
      borderLeftWidth: size,
      borderTopWidth: size,
      borderLeftColor: arrowColor,
    };
  }
  return {
    borderBottomWidth: size,
    borderLeftWidth: size,
    borderRightWidth: size,
    borderBottomColor: arrowColor,
  };
}

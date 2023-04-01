import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  useCalculatePosition,
  useClassStyles,
  useCreateClassString,
  usePopover,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { SharedAnchorPositioningProps, SupernovaProps } from '@types';
import { isFunction, isString } from '@utils';

import './styles.scss';

interface PropoverContentProps
  extends Omit<SupernovaProps, 'id'>,
    Omit<SharedAnchorPositioningProps, 'children'> {}

/**
 * The container for Popover related components.
 */
const PopoverContent: FC<PropoverContentProps> = props => {
  const {
    arrowSize = 15,
    background,
    backgroundColor,
    children,
    className,
    placement = 'bottom',
    spacing = 5,
    withArrow = true,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps({ ...rest, background, backgroundColor });
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const {
    closeOnBlur,
    closeOnEsc,
    finalFocusRef,
    id: popoverId,
    initialFocusRef,
    isOpen,
    onBlur,
    onClose,
    onEscPress,
    popoverButtonRef,
    shouldReturnFocusOnClose,
    trapFocus,
  } = usePopover();
  const toolRef = useRef<any>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const popoverContentRef = useRef<HTMLDivElement | null>(null);
  const addClasses = useCreateClassString('snui snui-popover', {
    'snui-popover--show': isOpen,
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const arrColor: any = useMemo(() => {
    if (isString(backgroundColor)) {
      return backgroundColor;
    }
    if (isString(background)) {
      return (background as string).split(' ')[0];
    }
    return 'var(--snui-color-white)';
  }, [background, backgroundColor]);
  const {
    calculateTransformOrigin,
    calcPosition,
    addArrowStyles,
    addElementStyles,
  } = useCalculatePosition(
    placement,
    withArrow,
    arrowSize,
    spacing,
    popoverButtonRef!.current as HTMLElement,
    toolRef,
    arrowRef,
    arrColor
  );
  const hasBlurredOutOfContent = useRef(false);
  // flag used to set that the popover has been opened
  // otherwise, finalFocusRef get focus on initial render.
  const hasOpened = useRef(false);

  useEffect(() => {
    if (isOpen && !initialFocusRef?.current && popoverContentRef?.current) {
      // give time until popover content becomes visible.
      setTimeout(() => {
        popoverContentRef?.current?.focus();
      }, 20);
    }
  }, [isOpen, initialFocusRef?.current, popoverContentRef.current]);

  useEffect(() => {
    calcPosition();
  }, []);

  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      calcPosition();
    }
  }, [isOpen, arrowSize, placement, spacing, withArrow]);

  // return focus to the popover button that tiggered the popover component.
  useEffect(
    () => () => {
      if (
        isOpen &&
        popoverButtonRef?.current &&
        !finalFocusRef?.current &&
        shouldReturnFocusOnClose
      ) {
        popoverButtonRef?.current?.focus();
      }
    },
    [isOpen]
  );

  // give focus to finalFocusRef
  useEffect(() => {
    if (!isOpen && finalFocusRef?.current && hasOpened.current) {
      hasOpened.current = false;
      finalFocusRef.current.focus();
    }
  }, [isOpen]);
  // handles logic to close popover when clicking
  // outside the PopoverContent component.
  useEffect(() => {
    const handleClick = (e: any) => {
      const { target } = e;

      // close Popover when user clicks outside the content element
      if (target?.parentElement?.id !== popoverId && closeOnBlur) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [isOpen]);

  const rootNode = useRef<HTMLDivElement | null>(null);
  const focusableItems = useRef<HTMLElement[]>([]);

  // ============================================
  // credit
  // https://medium.com/tamman-inc/create-a-reusable-focus-lock-in-react-to-improve-user-experience-and-accessibility-90829426fae2
  useEffect(() => {
    // check for all the focusable children of the root node
    const updateFocusableItems = () => {
      (focusableItems as any).current = rootNode!.current!.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
      );
    };
    const observer = new MutationObserver(() => {
      updateFocusableItems();
    });

    updateFocusableItems();
    observer.observe(rootNode.current as Node, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [rootNode.current]);

  useEffect(() => {
    if (isOpen) {
      // when there is at least one focusable item inside the modal and
      // initialFocusRef is not defined,
      // focus the first item
      if (focusableItems.current.length > 0 && !initialFocusRef) {
        focusableItems.current[0].focus();
      }

      // set the focus to the user defined element
      if (initialFocusRef && initialFocusRef.current) {
        // make sure that initialFocusRef is not disabled
        if (
          !initialFocusRef.current.hasAttribute('disabled') &&
          initialFocusRef.current.getAttribute('aria-disabled') !== 'true'
        ) {
          focusableItems.current.forEach(item => {
            // make sure the initialFocusRef is focusable
            // and inside the Modal
            if (item === initialFocusRef.current) {
              // give time to get the activeElement that triggered
              // the modal.
              setTimeout(() => {
                initialFocusRef!.current!.focus();
              }, 15);
            }
          });
        } else {
          // when the initialFocusRef prop is set to a disabled element
          // focus should go to the first focusable element
          focusableItems.current[0].focus();
        }
      }
    }
  }, [isOpen]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      // do nothing when there are no focusable items
      if (!focusableItems.current) {
        return;
      }

      const { key, shiftKey } = e;
      const {
        length,
        0: firstItem,
        [length - 1]: lastItem,
      } = focusableItems.current;

      if (key === 'Escape' && closeOnEsc) {
        if (isFunction(onEscPress)) {
          onEscPress!();
        }
        // reset value
        hasBlurredOutOfContent.current = false;
        onClose();
        return;
      }

      if (
        shiftKey &&
        key === 'Tab' &&
        document.activeElement === popoverContentRef.current &&
        closeOnBlur
      ) {
        if (isFunction(onBlur)) {
          onBlur!();
        }
        // reset value
        hasBlurredOutOfContent.current = false;
        onClose();
      }

      // trap focus
      if (trapFocus && key === 'Tab') {
        // when there is only one item, prevent tabbing when locked
        if (length === 1) {
          e.preventDefault();
          return;
        }

        // when last item if focused, move focus to the first item
        if (!shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
          return;
        }

        // when first item if focused, move focus to the last item
        if (shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem.focus();
        }
      }
    },
    [closeOnBlur, closeOnEsc]
  );

  const handleOnBlur = useCallback(() => {
    if (!hasBlurredOutOfContent.current) {
      hasBlurredOutOfContent.current = true;
    } else if (hasBlurredOutOfContent.current && closeOnBlur && !trapFocus) {
      if (isFunction(onBlur)) {
        onBlur!();
      }
      // reset value
      hasBlurredOutOfContent.current = false;
      onClose();
    }
  }, [closeOnBlur]);

  return (
    <div className="snui snui-floating" {...addElementStyles()}>
      {/* eslint-disable-next-line */}
      <div
        data-focus-lock={trapFocus}
        ref={rootNode}
        onKeyDown={isOpen ? handleKeyPress : undefined}
      >
        {/* eslint-disable-next-line */}
        <section
          {...remainingProps}
          {...addClasses()}
          {...calculateTransformOrigin()}
          aria-labelledby={`${popoverId}__header`}
          aria-describedby={`${popoverId}__body`}
          id={popoverId}
          onBlur={isOpen ? handleOnBlur : undefined}
          ref={popoverContentRef}
          role="dialog"
          tabIndex={-1}
        >
          {children}
        </section>
      </div>
      {withArrow && (
        <div {...addArrowStyles()}>
          <div
            className={`snui snui-floating__inner snui-menu__arrow${
              isOpen ? ' snui-menu__arrow--show' : ''
            }`}
            style={{
              background: arrColor,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PopoverContent;

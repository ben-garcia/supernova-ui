import React, { FC, useCallback, useEffect, useRef } from 'react';

import { isFunction } from '@utils';

import { FocusLockProps } from './types';

/**
 * Component that locks the focus to its children.
 * used for AlertDialog, Drawer, Modal, and Popover components
 *
 * NOTE: FOR INTERNAL USE
 */
const FocusLock: FC<FocusLockProps> = props => {
  const {
    children,
    closeOnEsc,
    closeOnOverlayClick,
    enterExitMode,
    finalFocusRef,
    initialFocusRef,
    leaveExitMode,
    onClickOutside,
    onClose,
    onEscPress,
    trapFocus = true,
  } = props;
  const rootNode = useRef<HTMLDivElement | null>(null);
  const focusableItems = useRef<HTMLElement[]>([]);
  // The element that toggles the opening the child component.
  const triggerElement = useRef<Element | null>(null);

  const triggerCloseAnimation = useCallback((isForEsc: boolean) => {
    if (isFunction(enterExitMode)) {
      enterExitMode!();
    }

    if (
      (!isFunction(onEscPress) &&
        closeOnEsc &&
        !isFunction(onClickOutside) &&
        closeOnOverlayClick) ||
      (!isFunction(onClickOutside) &&
        closeOnOverlayClick &&
        !isFunction(onEscPress) &&
        !closeOnEsc) ||
      (!isFunction(onEscPress) &&
        closeOnEsc &&
        !isFunction(onClickOutside) &&
        !closeOnOverlayClick)
    ) {
      onClose();
      return;
    }

    setTimeout(() => {
      if (isFunction(leaveExitMode)) {
        leaveExitMode!();
      }

      if (isForEsc) {
        // invoke the 'onEscPress' prop passed in
        if (isFunction(onEscPress) && closeOnEsc) {
          onEscPress!();
        }
      } else {
        // eslint-disable-next-line
        if (isFunction(onClickOutside) && closeOnOverlayClick) {
          // invoke the 'onClickOutside' prop passed in
          onClickOutside!();
        }
      }
    }, 300);
  }, []);

  // return focus to the correct element.
  useEffect(() => {
    // get a reference to the element that triggered the modal.
    triggerElement.current = document.activeElement;

    return () => {
      if (!finalFocusRef?.current) {
        // when Modal is closed, the focus should return to the element
        // that triggered it as per the WAI-ARIA best practices guide
        (triggerElement!.current! as HTMLElement).focus();
      } else {
        finalFocusRef.current.focus();
      }
    };
  }, []);

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
  }, [rootNode]);
  // ============================================

  useEffect(() => {
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
            initialFocusRef!.current!.focus();
          }
        });
      } else {
        // when the initialFocusRef prop is set to a disabled element
        // focus should go to the first focusable element
        focusableItems.current[0].focus();
      }
    }
  }, []);

  useEffect(() => {
    // key press handler
    const handleKeyPress = (e: KeyboardEvent) => {
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

      // close the Modal
      if (key === 'Escape' && closeOnEsc) {
        triggerCloseAnimation(true);
      }

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
    };

    // set the keydown handle on the window
    window.addEventListener('keydown', handleKeyPress);
    // remove keydown handle when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [trapFocus, focusableItems]);
  const handleClick = useCallback((e: React.SyntheticEvent) => {
    // when the overlay is clicked closeOnOverlayClick prop is true
    // close the Modal
    if (e.target === rootNode.current?.firstChild && closeOnOverlayClick) {
      triggerCloseAnimation(false);
    }
  }, []);
  const handleMouseDown = useCallback((e: any) => {
    if (e.target.localName.toLowerCase() !== 'button') {
      e.preventDefault();
    }
  }, []);

  return (
    // eslint-disable-next-line
    <div
      data-trap-focus={trapFocus}
      onClick={handleClick}
      onMouseDown={!closeOnOverlayClick ? handleMouseDown : undefined}
      ref={rootNode}
    >
      {children}
    </div>
  );
};

export default FocusLock;

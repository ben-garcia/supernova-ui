/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import React, { useEffect, useRef } from 'react';

import { FocusLockProps } from './types';

/**
 * Component that locks the focus to its children
 *
 * used for Modal, Drawer, Popover components
 *
 * credit
 * @see https://medium.com/tamman-inc/create-a-reusable-focus-lock-in-react-to-improve-user-experience-and-accessibility-90829426fae2
 */
const FocusLock: React.FC<FocusLockProps> = props => {
  const {
    children,
    closeOnEsc,
    closeOnOverlayClick,
    initialFocusRef,
    onClose,
    trapFocus = true,
  } = props;
  const rootNode = useRef<HTMLDivElement | null>(null);
  const focusableItems = useRef<HTMLElement[]>([]);

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

  useEffect(() => {
    // when there is at least one focusable item inside the modal and
    // initialFocusRef is not defined,
    // focus the first item
    if (focusableItems.current.length > 0 && !initialFocusRef) {
      focusableItems.current[0].focus();
    }

    // set the focus to the user defined element
    if (initialFocusRef && initialFocusRef.current) {
      // make sure the initialFocusRef is not disabled
      if (
        !initialFocusRef.current.hasAttribute('disabled') &&
        !initialFocusRef.current.hasAttribute('aria-disabled')
      ) {
        focusableItems.current.forEach(item => {
          // make sure the initialFocusRef is focusable
          // and inside the Modal
          if (item === initialFocusRef.current) {
            initialFocusRef!.current!.focus();
          }
        });
      } else {
        // when the initialFocusRef prop is set to a disabled element
        // the the focus should go to the first focusable element
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

      // when the Esc key is press and closeOnEsc is true
      // close the Modal
      if (closeOnEsc && key === 'Escape') {
        onClose();
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
  const handleClick = (e: React.SyntheticEvent) => {
    // when the overlay is clicked closeOnOverlayClick prop is true
    // close the Modal
    if (closeOnOverlayClick && e.target === rootNode.current?.firstChild) {
      onClose();
    }
  };

  return (
    <div onClick={handleClick} ref={rootNode}>
      {children}
    </div>
  );
};

export default FocusLock;

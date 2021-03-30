import React, { useEffect, useRef } from 'react';

interface FocusLockProps {
  children: React.ReactNode;
  /**
   * Should the focus be allowed outside the component
   *
   * default is false
   */
  isLocked?: boolean;
}

/**
 * Component that locks the focus to its children
 *
 * used for Modal, Drawer, Popover components
 *
 * credit
 * @see https://medium.com/tamman-inc/create-a-reusable-focus-lock-in-react-to-improve-user-experience-and-accessibility-90829426fae2
 */
const FocusLock: React.FC<FocusLockProps> = props => {
  const { children, isLocked = true } = props;
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

      if (isLocked && key === 'Tab') {
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
  }, [isLocked, focusableItems]);

  return <div ref={rootNode}>{children}</div>;
};

export default FocusLock;

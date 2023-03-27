// credit
// https:github.com/denno020/useScrollLock/blob/master/src/hooks/useScrollLock.js

import { useCallback, useLayoutEffect, useRef } from 'react';

function isiOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

/**
 * React hook that lock the body tag from scrolling.
 *
 *  Useful when opening AletDialog, Drawer, and Modal.
 */
export const useScrollLock = () => {
  const scrollOffset = useRef(0);
  const lock = useCallback(() => {
    // add data attribte to help prevent layout shifting
    // of fixed elements like a help button on the bottom right
    // of the body.
    document.body.dataset.scrollLock = 'true';
    // prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--snui-scrollbar-width)';

    if (isiOS()) {
      scrollOffset.current = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollOffset.current}px`;
      document.body.style.width = '100%';
    }
  }, []);

  const unlock = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    if (isiOS()) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollOffset.current);
    }

    // remove data attribute
    delete document.body.dataset.scrollLock;
  }, []);

  useLayoutEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
    const bodyPaddingRighg = parseInt(
      getComputedStyle(document.body).getPropertyValue('padding-right'),
      10
    );
    // take into account any padding right the body already has.
    if (bodyPaddingRighg) {
      document.body.style.setProperty(
        '--snui-scrollbar-width',
        `${bodyPaddingRighg + scrollbarWidth}px`
      );
    } else {
      document.body.style.setProperty(
        '--snui-scrollbar-width',
        `${scrollbarWidth}px`
      );
    }
  }, []);

  return {
    lock,
    unlock,
  };
};

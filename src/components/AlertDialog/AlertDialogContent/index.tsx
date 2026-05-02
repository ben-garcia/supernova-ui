import React, { FC, PropsWithChildren, useEffect } from 'react';

import FocusLock from '@components/FocusLock';
import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useAlertDialog } from '@hooks/use-alert-dialog';
import { useScrollLock } from '@hooks/use-scroll-lock';
import { isString } from '@utils/assertions';
import type { SupernovaProps } from '@types';
import './styles.scss';

export type AlertDialogContentProps = Omit<SupernovaProps, 'id'>;

/**
 * The container for AlertDialog related components.
 */
const AlertDialogContent: FC<
  PropsWithChildren<AlertDialogContentProps>
> = props => {
  const { children, ...rest } = props;
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    enterExitMode = () => {},
    id: alertDialogId,
    isExiting,
    leastDestructiveRef,
    leaveExitMode = () => {},
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  } = useAlertDialog();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-alert-dialog',
    {
      'snui-alert-dialog--exiting': isExiting as boolean,
      [`snui-alert-dialog--${size}`]: isString(size),
    }
  );
  const { lock, unlock } = useScrollLock();

  useEffect(() => {
    lock();
    return () => {
      unlock();
    };
  }, []);

  return (
    <FocusLock
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      enterExitMode={enterExitMode}
      finalFocusRef={finalFocusRef}
      initialFocusRef={leastDestructiveRef as any}
      leaveExitMode={leaveExitMode}
      onClickOutside={onClickOutside}
      onClose={onClose}
      onEscPress={onEscPress}
      trapFocus={trapFocus}
    >
      {/* NOTE: When overlay contains AlertDialogContent there is no problem.
                When overlay is a sibling element, then this div is responsible
                for rendering correctly. */}
      <div className="snui snui-alert-dialog-container">
        <section
          {...addCSSClassesAndProps()}
          aria-labelledby={`${alertDialogId}__header`}
          aria-describedby={`${alertDialogId}__body`}
          aria-modal="true"
          id={alertDialogId}
          role="alertdialog"
        >
          {children}
        </section>
      </div>
    </FocusLock>
  );
};

export default AlertDialogContent;

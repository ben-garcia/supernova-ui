import React, { FC, useEffect, useRef } from 'react';

import FocusLock from '@atoms/FocusLock';
import {
  useAlertDialog,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { SupernovaProps } from '@types';
import { isString } from '@utils';

import './styles.scss';

type AlertDialogContentProps = Omit<SupernovaProps, 'id'>;

/**
 * The container for AlertDialog related components.
 */
const AlertDialogContent: FC<AlertDialogContentProps> = props => {
  const { children, className, ...rest } = props;
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    enterExitMode = () => {},
    id: alertDialogId,
    isExiting,
    isOpen,
    leastDestructiveRef,
    leaveExitMode = () => {},
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  } = useAlertDialog();
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-alert-dialog', {
    [`${className}`]: isString(className),
    'snui-alert-dialog--exiting': isExiting as boolean,
    [`snui-alert-dialog--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const previousActiveElement = useRef<Element | null>(null);

  // get a reference to the focused element that triggerd the Modal
  useEffect(() => {
    previousActiveElement.current = document.activeElement;

    return () => {
      if (!finalFocusRef?.current) {
        // when Modal is closed, the focus should return to the element
        // that triggered it as per the WAI-ARIA best practices guide
        (previousActiveElement!.current! as HTMLElement).focus();
      } else {
        finalFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <FocusLock
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      enterExitMode={enterExitMode}
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
      <div className="snui-alert-dialog-container">
        <section
          {...remainingProps}
          {...addClasses()}
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

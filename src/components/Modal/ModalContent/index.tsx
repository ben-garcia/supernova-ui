import React, { FC, useEffect } from 'react';

import FocusLock from '@components/FocusLock';
import { useCSSAndPseudoClassProps, useModal, useScrollLock } from '@hooks';
import { SupernovaProps } from '@types';
import { isString } from '@utils';
import './styles.scss';

type ModalContentProps = Omit<SupernovaProps, 'id'>;

/**
 * The container for Modal related components.
 */
const ModalContent: FC<ModalContentProps> = props => {
  const { children, ...rest } = props;
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    enterExitMode = () => {},
    id: modalId,
    initialFocusRef,
    isExiting,
    leaveExitMode = () => {},
    onClickOutside,
    onClose,
    onEscPress,
    size,
    trapFocus,
  } = useModal();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-modal',
    {
      'snui-modal--exiting': isExiting as boolean,
      [`snui-modal--${size}`]: isString(size),
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
      initialFocusRef={initialFocusRef as any}
      leaveExitMode={leaveExitMode}
      onClickOutside={onClickOutside}
      onClose={onClose}
      onEscPress={onEscPress}
      trapFocus={trapFocus}
    >
      {/* NOTE: When overlay contains ModalContent there is no problem.
                When overlay is a sibling element, then this div is responsible
                for rendering correctly. */}
      <div className="snui snui-modal-container">
        <section
          {...addCSSClassesAndProps()}
          aria-labelledby={`${modalId}__header`}
          aria-describedby={`${modalId}__body`}
          aria-modal="true"
          id={modalId}
          role="dialog"
        >
          {children}
        </section>
      </div>
    </FocusLock>
  );
};

export default ModalContent;

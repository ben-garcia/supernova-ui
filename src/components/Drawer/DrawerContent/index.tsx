import React, { FC, useEffect } from 'react';

import FocusLock from '@components/FocusLock';
import { useCSSAndPseudoClassProps, useDrawer, useScrollLock } from '@hooks';
import { SupernovaProps } from '@types';
import { isString } from '@utils';
import './styles.scss';

type DrawerContentProps = Omit<SupernovaProps, 'id'>;

/**
 * The container for Drawer related components.
 */
const DrawerContent: FC<DrawerContentProps> = props => {
  const { children, ...rest } = props;
  const {
    closeOnEsc,
    closeOnOverlayClick,
    finalFocusRef,
    enterExitMode = () => {},
    id: drawerId,
    initialFocusRef,
    isExiting,
    leaveExitMode = () => {},
    onClickOutside,
    onClose,
    onEscPress,
    placement,
    size,
    trapFocus,
  } = useDrawer();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-drawer',
    {
      [`snui-drawer--${placement}`]: true,
      [`snui-drawer--${placement}--exiting`]: isExiting as boolean,
      [`snui-drawer--${size}`]: isString(size),
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
      {/* NOTE: When overlay contains DrawerContent there is no problem.
                When overlay is a sibling element, then this div is responsible
                for rendering correctly. */}
      <div className="snui snui-modal-container">
        <section
          {...addCSSClassesAndProps()}
          aria-labelledby={`${drawerId}__header`}
          aria-describedby={`${drawerId}__body`}
          aria-modal="true"
          id={drawerId}
          role="dialog"
        >
          {children}
        </section>
      </div>
    </FocusLock>
  );
};

export default DrawerContent;

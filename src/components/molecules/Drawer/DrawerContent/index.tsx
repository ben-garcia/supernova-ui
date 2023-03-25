import React, { FC } from 'react';

import FocusLock from '@atoms/FocusLock';
import {
  useDrawer,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { SupernovaProps } from '@types';
import { isString } from '@utils';

import './styles.scss';

type DrawerContentProps = Omit<SupernovaProps, 'id'>;

/**
 * The container for Drawer related components.
 */
const DrawerContent: FC<DrawerContentProps> = props => {
  const { children, className, ...rest } = props;
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
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-drawer', {
    [`${className}`]: isString(className),
    [`snui-drawer--${placement}`]: true,
    [`snui-drawer--${placement}--exiting`]: isExiting as boolean,
    [`snui-drawer--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

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
          {...remainingProps}
          {...addClasses()}
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

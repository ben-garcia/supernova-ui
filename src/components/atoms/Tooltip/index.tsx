import React, {
  FC,
  Children,
  cloneElement,
  useMemo,
  useState,
  useRef,
} from 'react';

import Floating from '@atoms/Floating';
import {
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  useTheme,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';
import { TooltipProps } from './types';

import './styles.scss';

const Tooltip: FC<TooltipProps> = props => {
  const {
    arrowSize = 15,
    children,
    className,
    closeDelay = 0,
    colorVariant,
    id,
    isDisabled = false,
    label,
    openDelay = 0,
    placement = 'bottom',
    spacing = 5,
    withArrow = false,
    background,
    backgroundColor,
    ...rest
  } = props;
  const { remainingProps, validatedCSSProps } = useValidateProps({
    ...rest,
    background,
    backgroundColor,
  });
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-tooltip', {
    [`${className}`]: isString(className),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const createInlineStyles = useInlineStyles(colorVariant);
  const triggerRef = useRef<any>(null);
  const tooltipId = id ?? useUniqueId('snui-tooltip');
  const [show, setShow] = useState(false);
  const { colors } = useTheme();
  const arrColor = useMemo(() => {
    if (isString(colorVariant) && (colors as any)[colorVariant!]) {
      return (colors as any)[colorVariant!];
    }
    if (isString(backgroundColor)) {
      return backgroundColor;
    }
    if (isString(background)) {
      return (background as string).split(' ')[0];
    }
    return '#4d5665';
  }, [colorVariant, background, backgroundColor]);
  const onMouseEnter = React.useCallback(() => {
    setShow(true);
  }, []);
  const onMouseLeave = React.useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      {isString(children) ? (
        <span
          aria-describedby={show ? tooltipId : undefined}
          onBlur={isDisabled ? undefined : onMouseLeave}
          onFocus={isDisabled ? undefined : onMouseEnter}
          onMouseEnter={isDisabled ? undefined : onMouseEnter}
          onMouseLeave={isDisabled ? undefined : onMouseLeave}
          ref={isDisabled ? undefined : triggerRef}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={isDisabled ? undefined : 0}
        >
          {children}
        </span>
      ) : (
          cloneElement(Children.only(children) as any, {
            'aria-describedby': show ? tooltipId : undefined,
            onBlur: isDisabled ? undefined : onMouseLeave,
            onFocus: isDisabled ? undefined : onMouseEnter,
            onMouseEnter: isDisabled ? undefined : onMouseEnter,
            onMouseLeave: isDisabled ? undefined : onMouseLeave,
            ref: isDisabled ? undefined : triggerRef,
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0,
          })
        )}
      <Floating
        arrowColor={arrColor}
        arrowSize={arrowSize}
        closeDelay={closeDelay}
        openDelay={openDelay}
        isDisabled={isDisabled}
        placement={placement}
        show={show}
        spacing={spacing}
        triggerRef={triggerRef}
        withArrow={withArrow}
      >
        <div
          {...remainingProps}
          {...addClasses()}
          {...createInlineStyles()}
          id={tooltipId}
          role="tooltip"
        >
          {label}
        </div>
      </Floating>
    </>
  );
};

export default Tooltip;

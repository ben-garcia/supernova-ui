import React from 'react';

import { FlexItemProps } from './types';
import { useBreakpoint } from '../../../../hooks';
import { createClasses, isString } from '../../../../utils';

const FlexItem: React.FC<FlexItemProps> = props => {
  const {
    children,
    className = '',
    lg = null,
    md = null,
    sm = null,
    xl = null,
    xs = null,
    xxl = null,
    /** for internal use ONLY
     *
     * used by Flex container to pass the
     * the correct padding based on Flex spacing prop
     */
    // @ts-ignore
    internalUsePadding = null,
  } = props;
  const breakpoint = useBreakpoint();
  const longestBreakpoint = React.useMemo(() => {
    if (xxl) {
      return 'xxl';
    }
    if (xl) {
      return 'xl';
    }
    if (lg) {
      return 'lg';
    }
    if (md) {
      return 'md';
    }
    if (sm) {
      return 'sm';
    }
    if (xs) {
      return 'xs';
    }
    return null;
  }, []);
  const breakpointObj = React.useMemo(
    () => ({
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
    }),
    []
  );
  const classes = createClasses('snui-flex-item', {
    [`${className}`]: isString(className),
  });
  const styles: any = {};

  styles.padding = internalUsePadding;
  styles.flexGrow = 0;

  if (longestBreakpoint && breakpointObj[longestBreakpoint]) {
    const widthPercent = `${(breakpointObj[longestBreakpoint]! / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else {
    styles.flexBasis = '100%';
    styles.maxWidth = '100%';
  }

  if (breakpointObj[breakpoint]) {
    const widthPercent = `${(breakpointObj[breakpoint]! / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  }

  if (breakpointObj[breakpoint] === 0) {
    styles.flexBasis = '0%';
    styles.maxWidth = '0%';
  }

  /*
  if (breakpoint === 'xs' && xs) {
    const widthPercent = `${(xs / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else if (breakpoint === 'sm' && sm) {
    const widthPercent = `${(sm / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else if (breakpoint === 'md' && md) {
    const widthPercent = `${(md / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else if (breakpoint === 'lg' && lg) {
    const widthPercent = `${(lg / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else if (breakpoint === 'xl' && xl) {
    const widthPercent = `${(xl / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else if (breakpoint === 'xxl' && xxl) {
    const widthPercent = `${(xxl / 12) * 100}%`;
    styles.flexBasis = widthPercent;
    styles.maxWidth = widthPercent;
  } else {
    styles.flexBasis = '100%';
    styles.maxWidth = '100%';
  }
	 */

  return (
    <div className={classes} style={styles}>
      {children}
    </div>
  );
};

export default FlexItem;

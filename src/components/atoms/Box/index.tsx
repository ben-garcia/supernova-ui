import {
  StandardLonghandProperties,
  StandardShorthandProperties,
} from 'csstype';
import React, { AriaAttributes } from 'react';

import Portal from '@atoms/Portal';
import { isString } from '@utils/index';

interface Props {
  className?: string;
}

export type BoxProps = AriaAttributes &
  Props &
  StandardLonghandProperties &
  StandardShorthandProperties;

const Box: React.FC<BoxProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <Portal id="best-portal">
      <div className={isString(className) ? className : undefined} style={rest}>
        {children}
      </div>
    </Portal>
  );
};

export default Box;

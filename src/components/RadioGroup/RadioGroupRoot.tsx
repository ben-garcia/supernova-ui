import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';

import { RadioGroupProvider } from '@contexts/radio-group/RadioGroupProvider';
import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useDualModeInput } from '@hooks/use-dual-mode-input';
import { isString } from '@utils/assertions';
import type { RadioGroupRootProps } from './types';

/**
 * UI component used as a wrapper for Radio components
 * Supports both controlled and uncontrolled modes
 */
const RadioGroupRoot: FC<PropsWithChildren<RadioGroupRootProps>> = props => {
  const {
    colorVariant = 'primary',
    children,
    defaultValue,
    orientation = 'row',
    name,
    onChange = null,
    value: valueProp,
    size = 'md',
    ...rest
  } = props;

  const { value, setInternalValue, isControlled } = useDualModeInput({
    defaultValue,
    name: 'RadioGroup',
    value: valueProp,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      // Always call parent's onChange callback
      onChange!(e.target.value);
    },
    [isControlled]
  );

  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-radio-group snui-inline-flex snui-gap-5',
    {
      [`snui-flex-${orientation}`]: isString(orientation),
      'snui-flex-center': isString(orientation) && orientation === 'row',
      'snui-items-flex-start':
        isString(orientation) && orientation === 'column',
    }
  );

  const context = useMemo(
    () => ({
      colorVariant,
      name,
      size,
      onChange: handleChange,
      value,
    }),
    [colorVariant, name, size, value]
  );

  return (
    <RadioGroupProvider value={context}>
      <div {...addCSSClassesAndProps()} role="radiogroup">
        {children}
      </div>
    </RadioGroupProvider>
  );
};

export default RadioGroupRoot;

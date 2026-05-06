import React, {
  FC,
  PropsWithChildren,
  Children,
  ReactNode,
  cloneElement,
} from 'react';

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
    children,
    defaultValue,
    value: valueProp,
    orientation = 'row',
    name,
    onChange = () => {},
    ...rest
  } = props;

  const { value, setInternalValue, isControlled } = useDualModeInput({
    defaultValue,
    name: 'RadioGroup',
    value: valueProp,
  });

  // children with the added props to be rendered
  const enhancedChildren: ReactNode[] = [];
  Children.toArray(children).forEach(child => {
    if (!React.isValidElement(child)) return;

    const childValue = child.props.value as string;
    if (!childValue) {
      // eslint-disable-next-line
      console.warn('<RadioGroupItem /> missing "value" prop');
      return;
    }
    const newChild = cloneElement(child, {
      isChecked: value === childValue,
      name,
      onChange: () => {
        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(childValue);
        }
        // Always call parent's onChange callback
        onChange!(childValue);
      },
    });
    enhancedChildren.push(newChild);
  });

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

  return (
    <div {...addCSSClassesAndProps()} role="radiogroup">
      {enhancedChildren}
    </div>
  );
};

export default RadioGroupRoot;

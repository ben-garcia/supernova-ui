import React, {
  FC,
  PropsWithChildren,
  Children,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
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
    value,
    orientation = 'row',
    name,
    onChange = () => {},
    ...rest
  } = props;

  // Determine if this is controlled or uncontrolled mode
  const isControlled = value !== undefined;
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );
  // Use value if controlled, otherwise use internal state
  const currentValue = isControlled ? value : internalValue;

  // Validate against using both controlled and uncontrolled modes.
  useEffect(() => {
    if (value !== undefined && defaultValue !== undefined) {
      // eslint-disable-next-line
      console.warn(
        '<RadioGroup>: Do not specify both "value" and "defaultValue". ' +
          'Use "value" for controlled mode or "defaultValue" for uncontrolled mode.'
      );
    }
  }, [value, defaultValue]);

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
      isChecked: currentValue === childValue,
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

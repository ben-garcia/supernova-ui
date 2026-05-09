// import React, {
//   FC,
//   PropsWithChildren,
//   Children,
//   ReactNode,
//   cloneElement,
//   useCallback,
// } from 'react';
//
// import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
// import { useDualModeInput } from '@hooks/use-dual-mode-input';
// import { isString } from '@utils/assertions';
// import type { CheckboxGroupRootProps } from './types';
//
// const CheckboxGroupRoot: FC<
//   PropsWithChildren<CheckboxGroupRootProps>
// > = props => {
//   const {
//     children,
//     defaultValue,
//     value: valueProp,
//     orientation = 'row',
//     onChange = () => {},
//     ...rest
//   } = props;
//
//   const { value, setInternalValue, isControlled } = useDualModeInput({
//     defaultValue,
//     name: 'CheckboxGroup',
//     value: valueProp,
//   });
//
//   const handleCheckboxChange = useCallback(
//     (childValue: string) => {
//       const currentArray = Array.isArray(value) ? value : [];
//       const newValue = [...currentArray];
//       const index = newValue.indexOf(childValue);
//
//       if (index > -1) {
//         // Remove unchecked from array
//         newValue.splice(index, 1);
//       } else {
//         // Add checked to array.
//         newValue.push(childValue);
//       }
//
//       if (!isControlled) {
//         setInternalValue(newValue);
//       }
//       onChange(newValue);
//     },
//     [value, isControlled, setInternalValue, onChange]
//   );
//
//   const enhancedChildren: ReactNode[] = [];
//   Children.toArray(children).forEach(child => {
//     if (!React.isValidElement(child)) return;
//
//     const childValue = child.props.value;
//     if (!isString(childValue)) {
//       console.warn('<CheckboxGroupItem /> "value" prop must be a string');
//       return;
//     }
//
//     const newChild = cloneElement(child, {
//       isChecked: Array.isArray(value) && value.includes(childValue),
//       onChange: () => handleCheckboxChange(childValue),
//     });
//     enhancedChildren.push(newChild);
//   });
//
//   const addCSSClassesAndProps = useCSSAndPseudoClassProps(
//     rest,
//     'snui snui-checkbox-group snui-inline-flex snui-gap-5',
//     {
//       [`snui-flex-${orientation}`]: isString(orientation),
//       'snui-flex-center': isString(orientation) && orientation === 'row',
//       'snui-items-flex-start':
//         isString(orientation) && orientation === 'column',
//     }
//   );
//
//   return (
//     <div {...addCSSClassesAndProps()} role="group">
//       {enhancedChildren}
//     </div>
//   );
// };
//
// export default CheckboxGroupRoot;

import React, {
  FC,
  PropsWithChildren,
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useDualModeInput } from '@hooks/use-dual-mode-input';
import { isArray, isString } from '@utils/assertions';
import type { CheckboxGroupRootProps } from './types';

const CheckboxGroupRoot: FC<
  PropsWithChildren<CheckboxGroupRootProps>
> = props => {
  const {
    children,
    defaultValue,
    name,
    onChange = () => {},
    orientation = 'row',
    value: valueProp,
    ...rest
  } = props;

  const { value, setInternalValue, isControlled } = useDualModeInput({
    defaultValue,
    name: 'CheckboxGroup',
    value: valueProp,
  });

  const handleChange = useCallback(
    (childValue: string) => {
      const currentArray = Array.isArray(value) ? value : [];
      const newValue = [...currentArray];
      const index = newValue.indexOf(childValue);

      if (index > -1) {
        // Remove the unchecked checkbox from array
        newValue.splice(index, 1);
      } else {
        // Add checked checked to array.
        newValue.push(childValue);
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange(newValue);
    },
    [value, isControlled, setInternalValue, onChange]
  );

  const enhancedChildren: ReactNode[] = [];
  Children.toArray(children).forEach(child => {
    if (!isValidElement(child)) return;

    const childValue = child.props.value;
    if (!isString(childValue)) {
      console.warn('<CheckboxGroupItem /> "value" prop must be a string array');
      return;
    }

    const newChild = cloneElement(child, {
      isChecked: isArray(value) && value!.includes(childValue),
      name,
      onChange: () => handleChange(childValue),
    });
    enhancedChildren.push(newChild);
  });

  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-checkbox-group snui-inline-flex snui-gap-5',
    {
      [`snui-flex-${orientation}`]: isString(orientation),
      'snui-flex-center': isString(orientation) && orientation === 'row',
      'snui-items-flex-start':
        isString(orientation) && orientation === 'column',
    }
  );

  return (
    <div {...addCSSClassesAndProps()} role="group">
      {enhancedChildren}
    </div>
  );
};

export default CheckboxGroupRoot;

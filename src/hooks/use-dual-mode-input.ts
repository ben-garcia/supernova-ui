import { useEffect, useRef, useState } from 'react';

interface UseDualModeInputProps {
  /**
   * The current value of state. Indicates controlled mode.
   */
  value?: boolean | string | number | readonly string[];
  /**
   * The initial value of the input. Indicates uncontrolled mode.
   */
  defaultValue?: boolean | string | number | readonly string[];
  /**
   * Name of the input component.
   */
  name: string;
}

/**
 * Hook that detects whether form input fields are used in controlled or
 * uncontrolled mode.
 */
export function useDualModeInput({
  value: controlled,
  defaultValue,
  name,
}: UseDualModeInputProps) {
  // Determine if this is controlled or uncontrolled mode
  const isControlled = controlled !== undefined;
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<
    boolean | string | number | readonly string[] | undefined
  >(defaultValue);
  // Use value if controlled, otherwise use internal state
  const currentValue = isControlled ? controlled : internalValue;
  // Move this to the top level
  const wasControlledRef = useRef(isControlled);

  // Validate against using both controlled and uncontrolled modes.
  useEffect(() => {
    if (controlled !== undefined && defaultValue !== undefined) {
      // eslint-disable-next-line
      console.warn(
        `<${name}>: Do not specify both "value/checked" and "defaultChecked/defaultValue".
          Use "value/checked" for controlled mode or "defaultChecked/defaultValue" for uncontrolled mode.`
      );
    }
  }, [controlled, defaultValue]);

  // Mode switching validation
  useEffect(() => {
    if (wasControlledRef.current !== isControlled) {
      // eslint-disable-next-line
      console.warn(
        `<${name}> switched from controlled to uncontrolled or vice versa`
      );
    }
    wasControlledRef.current = isControlled;
  }, [isControlled]);

  return { value: currentValue, setInternalValue, isControlled };
}

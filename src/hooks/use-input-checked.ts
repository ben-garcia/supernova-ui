import { useEffect, useState } from 'react';

import { useTheme } from '@hooks';
import { colors, inputIsChecked as inputHasChecked, isString } from '../utils';

/**
 * Hook that computes the background color of an input(radio, checkbox)
 * based on whether the input element as been checked
 *
 * @param elementId the input element id
 * @param backgroundColor the prop passed to the component
 * @param inputIsChecked used to control the state of the input
 * @param isChecked prop used to indicate whether the input is checked
 */
export const useInputChecked = (
  elementId: string,
  backgroundColor: string,
  inputIsChecked: boolean,
  isChecked: boolean = true
) => {
  const [backgroundColorToUse, setBackgroundColorToUse] = useState(
    backgroundColor || ''
  );
  const theme = useTheme();

  useEffect(() => {
    if (inputHasChecked(elementId)) {
      if (isString(backgroundColor) && inputIsChecked && isChecked) {
        if (colors.includes(backgroundColor as string)) {
          setBackgroundColorToUse((theme as any).colors[backgroundColor!]);
        } else {
          setBackgroundColorToUse(backgroundColor as string);
        }
      } else if (!isString(backgroundColor)) {
        setBackgroundColorToUse(theme.colors.info700);
      }
    } else {
      setBackgroundColorToUse(theme.colors.gray200);
    }
  }, [isChecked, inputIsChecked]);

  return backgroundColorToUse;
};

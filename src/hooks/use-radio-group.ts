import { useContext } from 'react';

import { RadioGroupContext } from '@contexts/radio-group';
// import { RadioGroupRootProps } from '@components/RadioGroup/types';

export function useRadioGroup() {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      'useRadioGroup: context is undefined, did you remember to wrap your components in a pair of <RadioGroup>'
    );
  }

  return context;
}

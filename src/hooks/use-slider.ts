import { useContext } from 'react';

import { SliderContext } from '@contexts';

/**
 * Hooks that returns all Slider props
 */
export const useSlider = () => {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error(
      'useSlider: context is undefined, did you remember to wrap your component in a pair of <Slider>'
    );
  }
  return context;
};

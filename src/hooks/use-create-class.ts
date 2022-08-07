import { useCallback } from 'react';

interface ClassesToAdd {
  [k: string]: boolean;
}

/**
 * React hooks that concatenates all the necessary classes into a string
 *
 * @param 'initialClass' first class in the result string.
 * @param 'classesToAdd' object of classes to add.
 */
export const useCreateClassString = (
  initialClass: string,
  classesToAdd: ClassesToAdd
) => {
  // array to store all classes
  const classes: string[] = initialClass.trim() !== '' ? [initialClass] : [];

  // loop through the classToAdd and included all the properties
  // whose value is true
  Object.entries(classesToAdd).forEach(
    ([className, isIncluded]: [string, boolean]) => {
      if (isIncluded) {
        classes.push(className);
      }
    }
  );

  // combine all the classes into a single string
  return useCallback(() => ({ className: classes.join(' ') }), [
    initialClass,
    classesToAdd,
  ]);
};

interface CreateClassesObject {
  [k: string]: boolean;
}

/**
 * Concatenates all the necessary classes into a string
 */
export const createClasses = (
  initialClass: string,
  obj: CreateClassesObject
) => {
  // check for a valid object
  if (Object.keys(obj).length === 0) {
    return initialClass;
  }
  // array to store all classes
  const classes: string[] = initialClass.trim() !== '' ? [initialClass] : [];

  // loop through the obj and included all the properties
  // whose value is true
  Object.entries(obj).forEach(([className, isIncluded]: [string, boolean]) => {
    if (isIncluded) {
      classes.push(className);
    }
  });

  // combine all the classes into a single string
  return classes.join(' ');
};

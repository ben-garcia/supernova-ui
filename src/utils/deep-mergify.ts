// as the name suggests
interface AnyObject {
  [k: string]: any;
}

/**
 * Performs a deep merge and returns a new object.
 *
 * The new object will have all the properties from baseObject
 * and overriden properties from extendedObject.
 */
export const deepMergify = (
  baseObject: AnyObject,
  extendedObject: AnyObject
): AnyObject => {
  const baseObjectKeys = Object.keys(baseObject);
  const extendedObjectKeys = Object.keys(extendedObject);
  let newObject: any = {};

  // when both objects are empty
  if (!baseObjectKeys.length && !extendedObjectKeys.length) {
    return newObject;
  }

  // when extendedObject is empty
  if (baseObjectKeys.length && !extendedObjectKeys.length) {
    return baseObject;
  }

  // when baseObject is empty
  if (!baseObjectKeys.length && extendedObjectKeys.length) {
    return extendedObject;
  }

  // make a copy of the base object
  // no need to modify it
  newObject = { ...baseObject };

  // loop through the extended object and override any new properties
  extendedObjectKeys.forEach((key: string) => {
    const keyType = Object.prototype.toString.call(extendedObject[key]);
    // base case
    // check if the value is a string or number
    if (keyType === '[object String]' || keyType === '[object Number]') {
      // key must match a key in baseObject
      if (baseObjectKeys.includes(key)) {
        newObject[key] = extendedObject[key];
      }
    }
    // check if the value if an object
    if (keyType === '[object Object]') {
      if (baseObjectKeys.includes(key)) {
        newObject[key] = { ...newObject[key], ...extendedObject[key] };
        // use recurstion when the value of property is an object
        newObject[key] = deepMergify(newObject[key], extendedObject[key]);
      }
    }
  });

  return newObject;
};

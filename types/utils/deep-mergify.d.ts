interface AnyObject {
    [k: string]: any;
}
/**
 * Performs a deep merge and returns a new object.
 *
 * The new object will have all the properties from baseObject
 * and overriden properties from extendedObject.
 */
export declare const deepMergify: (baseObject: AnyObject, extendedObject: AnyObject) => AnyObject;
export {};
//# sourceMappingURL=deep-mergify.d.ts.map
import React from 'react';
/**
 * Hooks that returns the FormControl props
 */
declare const useFormControlProvider: (props: any) => {
    isRequired: boolean;
    isInvalid: boolean;
    isDisabled: boolean;
    hasFeedbackText: boolean;
    setHasFeedbackText: React.Dispatch<React.SetStateAction<boolean>>;
    hasHelpText: boolean;
    setHasHelpText: React.Dispatch<React.SetStateAction<boolean>>;
    id: any;
    getHelpTextProps: (helperTextProps?: any, forwardedRef?: any) => any;
    getErrorMessageProps: (errorMessageProps?: any, forwardedRef?: any) => any;
};
/**
 * Hooks that returns all form control props
 */
declare const useFormControl: () => import("../contexts/form-control").FormControl;
export { useFormControlProvider, useFormControl };
//# sourceMappingURL=use-form-control.d.ts.map
import React, { ReactNode } from 'react';
import { SupernovaProps } from '@types';
interface FormErrorMessageProps extends SupernovaProps {
    children: ReactNode;
}
/**
 * Used to provider feedback about an invalid field.
 */
declare const FormErrorMessage: React.ForwardRefExoticComponent<FormErrorMessageProps & React.RefAttributes<HTMLDivElement>>;
export default FormErrorMessage;
//# sourceMappingURL=index.d.ts.map
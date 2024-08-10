import React, { FC } from 'react';
import { SupernovaProps } from '@types';
import './styles.scss';
interface EditableTextareaProps extends SupernovaProps {
    /**
     * textarea cols attribue.
     */
    cols?: number;
    initialHeight?: string;
    /**
     * Flag to enable auto resize.
     */
    isAutoResize?: boolean;
    /**
     * textarea maxlength attribute.
     */
    maxLength?: number;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /**
     * Callback function to call when a click
     * outside <EditableTextarea> component.
     *
     * @param val current value.
     */
    onClickOutside?: (val: string) => void;
    /**
     * textarea rows attribute.
     */
    rows?: number;
    initialWidth?: string;
}
/**
 * The component used to edit the previewed text in when a textarea is needed.
 */
declare const EditableTextarea: FC<EditableTextareaProps>;
export default EditableTextarea;
//# sourceMappingURL=index.d.ts.map
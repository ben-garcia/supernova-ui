import { FC, PropsWithChildren } from 'react';

import EditableRoot from './EditableRoot';
import EditableRootProps from './types';
import EditableInput, { EditableInputProps } from './EditableInput';
import EditablePreview, { EditablePreviewProps } from './EditablePreview';
import EditableTextarea, { EditableTextareaProps } from './EditableTextarea';

interface EditableComponent {
  /**
   * The container for all Editable related components
   * that provides context for all subcomponents.
   */
  Root: FC<PropsWithChildren<EditableRootProps>>;
  /**
   * The component used to edit the previewed text by an input.
   */
  Input: FC<EditableInputProps>;
  /**
   * The component that holds the preview content to be editable.
   */
  Preview: FC<EditablePreviewProps>;
  /**
   * The component used to edit the previewed text in when a textarea is needed.
   */
  Textarea: FC<EditableTextareaProps>;
}

const Editable: EditableComponent = {
  Root: EditableRoot,
  Input: EditableInput,
  Preview: EditablePreview,
  Textarea: EditableTextarea,
};

export default Editable;

import { ReactNode, RefObject } from 'react';
import EditableProps from '@components/Editable/types';

export type Editable = Omit<EditableProps, 'defaultValue'> & {
  customEditableRef: RefObject<HTMLButtonElement | null>;
  enterEditMode: () => void;
  exitEditMode: () => void;
  inputRef: RefObject<HTMLInputElement> | null;
  textareaRef: RefObject<HTMLTextAreaElement> | null;
  isCustomEditable: boolean;
  isEditing: boolean;
  value: string;
  setIsCustomEditable: () => void;
  setValue: (newValue: string) => void;
};

export interface EditableProviderProps {
  children: ReactNode;
  value: Editable;
}

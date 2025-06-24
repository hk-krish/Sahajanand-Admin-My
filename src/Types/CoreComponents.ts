import { FormEvent } from "react";

export interface SvgProps {
  iconId?: string | undefined;
  className?: string;
  style?: {
    height?: string;
    width?: string;
    fill?: string;
    marginRight?: string;
  };
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

export interface CardSubtitle {
  text?: string;
  code?: string;
  mark?: string;
}

export interface CardHeaderProp {
  title?: string;
  headClass?: string;
  tagClass?: string;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
  Search?: (key: string) => void;
  btnTitle?: string;
  btnClick?: () => void;
}

export interface InformationProp {
  headerTitle: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export interface RatioImageProp {
  className?: string;
  src: string;
  alt?: string;
  style?: { height: number };
}

export interface CommonFileUploadProps {
  multiple?: boolean;
  register?: any;
  errors?: any;
  setValue?: any;
  setPhoto?: (photo: string) => void; 
  uploadedFiles?: File[];
  setUploadedFiles?: (files: File[]) => void;
}

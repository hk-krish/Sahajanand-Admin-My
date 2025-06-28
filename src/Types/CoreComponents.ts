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
  btnLink?: string;
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
  errors?: any;
  setValue?: any;
  setPhoto?: (photo: string | string[]) => void;
  photo?: string | string[];
  uploadedFiles?: File[];
  setUploadedFiles?: (files: File[]) => void;
  trigger?:any;
  name?:string
}

export interface SearchFunctionProps {
  btnTitle: string;
  btnLink?: string;
  openModal?: () => void;
  setSearchData?: (value: string) => void;
}

export interface PaginationListProps {
  pageCount: number;
  onPageChange: (data: { selected: number }) => void;
  page: number;
}

export interface PaginationProps {
  pageCount: number;
  selectedPageLimit: number;
  onPageLimitChange: (limit: number) => void;
  onPageChange: (data: { selected: number }) => void;
  page: number;
}

export interface CustomCheckboxType {
  register: any;
  name: string;
  title?: string;
}

export interface CustomTypeaheadType {
  errors: any;
  control: any;
  title?: string;
  name?:string
}

export interface ProductImageProps {
  image: string | string[];
}

export interface AddTestimonialModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllTestimonial: () => void;
}

export interface TestimonialUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  userType: string;
}

export interface TestimonialType {
  _id: string;
  name: string;
  message: string;
  image: string;
  rating: number;
  userId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user?: TestimonialUser;
}

export interface TestimonialState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface TestimonialApiResponse {
  testimonial_data: TestimonialType[];
  totalData: number;
  state: TestimonialState;
}

export interface TestimonialSliceType {
  isAddTestimonialModal: boolean;
  allTestimonial: TestimonialApiResponse;
  isLoadingTestimonial: boolean;
  singleEditingTestimonial: TestimonialType;
}

export interface TestimonialFormData {
  message: string;
  rating: number;
  image: string[];
}

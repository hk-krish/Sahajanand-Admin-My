import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    // .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Login Id is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character").required("Password is required"),
});

export const AddProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
  client: yup.string().required("Client name is required"),
  progress: yup.number().typeError("Progress must be a number").min(0, "Minimum is 0%").max(100, "Maximum is 100%").required("Progress is required"),
});

export const AddCategorySchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
  client: yup.string().required("Client name is required"),
  progress: yup.number().typeError("Progress must be a number").min(0, "Minimum is 0%").max(100, "Maximum is 100%").required("Progress is required"),
});

export const AddFaqSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
});

export const AddBannerSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
});

export const AddBlogSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
});

export const AddCollectionSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  title: yup.string().required("Project title is required"),
});

export const SettingSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  client: yup.string().required("Client name is required"),
  progress: yup.number().typeError("Progress must be a number").min(0, "Minimum is 0%").max(100, "Maximum is 100%").required("Progress is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  email: yup.string().required("Product name is required"),
  oldPassword: yup.string().required("Mobile Number is required"),
  newPassword: yup.string().required("Client name is required"),
});

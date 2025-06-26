import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    // .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Login Id is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
});

const tagArraySchema = yup
  .array()
  .of(
    yup.lazy((value) =>
      typeof value === "string"
        ? yup.string()
        : yup.object().shape({
            label: yup.string().required(),
            customOption: yup.boolean().optional(),
          })
    )
  )
  .min(1, "At least one value is required")
  .required("This field is required");

export const AddProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  salePrice: yup.number().required("Sale Price is required"),
  sku: yup.string().required("SKU is required"),
  stock: yup.number().required("Stock is required"),
  categoryId: yup.string().required("Category is required"),
  subCategoryId: yup.string().required("Sub Category is required"),
  tags: tagArraySchema,
  color: tagArraySchema,
  size: tagArraySchema,
  material: tagArraySchema,
  fabric: tagArraySchema,
  occasion: tagArraySchema,
  isNewArrival: yup.boolean(),
  isBestSelling: yup.boolean(),
  isFeatured: yup.boolean(),
  showOnHomepage: yup.boolean(),
  image: yup
    .array()
    .of(
      yup.mixed().test("file-or-url", "Invalid image", (value) => {
        return typeof value === "string" || value instanceof File;
      })
    )
    .min(1, "Image is required")
    .required("Image is required"),
});

export const AddCategorySchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .array()
    .of(
      yup.mixed().test("file-or-url", "Invalid image", (value) => {
        return typeof value === "string" || value instanceof File;
      })
    )
    .min(1, "Image is required")
    .required("Image is required"),
  isFeatured: yup.boolean(),
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
  title: yup.string().required("Project title is required"),
  content: yup.string().required("Content is required"),
  slug: yup.string().required("Slug is required"),
  metaTitle: yup.string().required("Meta Title is required"),
  metaDescription: yup.string().required("Meta Description is required"),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
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

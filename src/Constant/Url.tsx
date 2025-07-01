export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const URL = {
  Auth: {
    Login: "/auth/login",
    ForgotPassword: "/auth/reset-password",
  },
  PrivacyPolicy: {
    PrivacyPolicy: "/privacy-policy",
    PrivacyPolicyEdit: "/privacy-policy/add/edit",
  },
  AboutUs: {
    AboutUs: "/about-us",
    AboutUsEdit: "/about-us/add/edit",
  },
  ReturnPolicy: {
    ReturnPolicy: "/return-policy",
    ReturnPolicyEdit: "/return-policy/add/edit",
  },
  TermsCondition: {
    TermsCondition: "/terms-condition",
    TermsConditionEdit: "/terms-condition/add/edit",
  },
  Category: {
    Category: "/category",
    Add: "/category/add",
    Delete: "/category",
    Edit: "/category/edit",
  },
  Upload: {
    Upload: "/upload",
    Delete: "/upload",
  },
  Product: {
    Product: "/product",
    Add: "/product/add",
    Edit: "/product/edit",
  },
  Blog: {
    Blog: "/blog",
    Add: "/blog/add",
    Edit: "/blog/edit",
    Delete: "/blog",
  },
  Banner: {
    Banner: "/banner",
    Add: "/banner/add",
    Edit: "/banner/edit",
    Delete: "/banner",
  },
  Faq: {
    Faq: "/faq",
    Add: "/faq/add",
    Edit: "/faq/edit",
    Delete: "/faq",
  },
  Collection: {
    Collection: "/collection",
    Add: "/collection/add",
    Edit: "/collection/edit",
    Delete: "/collection",
  },
  Users: {
    User: "/user",
    EditAdmin: "/user/edit-admin",
  },
} as const;

type UrlMap = typeof URL;
type ResolvedUrlMap = {
  [K in keyof UrlMap]: UrlMap[K] extends string ? string : { [P in keyof UrlMap[K]]: string };
};

export const Url_Keys: ResolvedUrlMap = Object.fromEntries(
  Object.entries(URL).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, `${BASE_URL}${value}`];
    } else {
      const nested = Object.fromEntries(Object.entries(value).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]));
      return [key, nested];
    }
  })
) as ResolvedUrlMap;

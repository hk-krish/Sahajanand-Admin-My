export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const URL = {
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
} as const;

// Type-safe transformation
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

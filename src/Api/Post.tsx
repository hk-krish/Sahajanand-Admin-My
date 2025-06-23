import { Toaster } from "@/Utils/ToastNotification";
import axios, { AxiosRequestHeaders } from "axios";
// import { getToken } from "../utils";

let isRedirecting = false;

export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

async function Post<TInput, TResponse>(url: string, data?: TInput): Promise<ApiResponse<TResponse> | null> {
  const isFormData = data instanceof FormData;
  // const token = getToken();
  const headers = {
    // ...(isToken ? { Authorization: token } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response = await axios.post<ApiResponse<TResponse>>(url, data, { headers });
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        Toaster("success", resData.message || "Success");
        return resData;
      } else {
        Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    } else if (response.status === 404) {
      Toaster("error", resData.message || "Not Found");
    } else {
      Toaster("error", resData.message || "Something went wrong");
    }
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Something went wrong";
    const status = error?.response?.status;

    if (status === 410 && !isRedirecting) {
      isRedirecting = true;
      window.location.href = "/";
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      Toaster("error", msg);
    }
  }

  return null;
}

export default Post;

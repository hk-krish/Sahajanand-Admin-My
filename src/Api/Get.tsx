import { Toaster } from "@/Utils/ToastNotification";
import axios, { AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

async function Get<T>(url: string): Promise<ApiResponse<T> | null> {
  let isRedirecting = false;

  const config: AxiosRequestConfig = {
    method: "GET",
  };

  try {
    const response = await axios.get<ApiResponse<T>>(url, config);
    
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
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
    const msg = error?.response?.data?.message || "No database connection";
    console.log("msg",msg);
    
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

export default Get;

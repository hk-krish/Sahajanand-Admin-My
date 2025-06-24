import { Toaster } from "@/Utils/ToastNotification";
import axios, { AxiosError } from "axios";

interface ResponseData {
  status: number;
  message?: string;
}

const Delete = async (url: string): Promise<ResponseData | null> => {
  let isRedirecting = false;

  try {
    const response = await axios.delete<ResponseData>(url, {
      headers: {
        // Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

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
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const msg = err?.response?.data?.message || "Something went wrong";
    const status = err?.response?.status;

    if (status === 410 && !isRedirecting) {
      isRedirecting = true;
      window.location.href = "/session-expired";
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      Toaster("error", msg);
    }
  }

  return null;
};

export default Delete;

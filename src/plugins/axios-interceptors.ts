import { AxiosRequestConfig } from "axios";
import { mainInstance } from "@/api/axios";
import { handleError } from "@/helpers/error-handling";
import { notice } from "@/plugins/notice";
import { ApiError } from "@/types/lib";

mainInstance.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    handleError(error, (msg) => {
      notice.error(msg);
    });

    return Promise.reject(error);
  }
);

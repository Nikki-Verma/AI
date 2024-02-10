import {
  DUMMY_TENANT_ID,
  PIM_SID,
  X_DEVICE_ID,
  X_TENANT_ID,
  X_USER_ID,
} from "@/utils/constants";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getSession } from "next-auth/react";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  async (request): Promise<AdaptAxiosRequestConfig> => {
    const session: any = await getSession();

    const DefaultHeaders: any = {
      [X_USER_ID]: session?.user?.details?.id,
      [X_TENANT_ID]: DUMMY_TENANT_ID,
      [PIM_SID]: session?.accessToken,
      [X_DEVICE_ID]: "armaze-web",
    };

    request.headers = { ...(request.headers || {}), ...DefaultHeaders };

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (typeof response?.data?.ok === "boolean") {
      if (response.data?.ok) {
        return response;
      } else {
        return Promise.reject(response);
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    //This means that session token has expired and need to generate new access token using create session api
    if (error?.response?.status === 511) {
      //TODO: Figure out a way to create new session and update next-auth session with new session
      //   const sessionId = await createSession();
      //   originalRequest.headers["pim-sid"] = sessionId;
      //   return axios(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const axiosInstanceWithoutWarehouse = axios.create();

export default axiosInstance;

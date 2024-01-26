import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  async (request): Promise<AdaptAxiosRequestConfig> => {
    // request.headers["X-TENANT-ID"] = getTenantID();

    // get session token fro next-auth
    // const sessionId = getSessionID();
    // if (sessionId) {
    //   request.headers["pim-sid"] = sessionId;
    // } else {
    //   const sessionId = await createSession();
    //   request.headers["pim-sid"] = sessionId;
    // }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
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
  }
);

export const axiosInstanceWithoutWarehouse = axios.create();

export default axiosInstance;

import {
  DUMMY_TENANT_ID,
  X_DEVICE_ID,
  X_PRODUCT_NAME,
  X_TENANT_ID,
} from "@/utils/constants";
import axios from "axios";

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    request.headers[X_TENANT_ID] = DUMMY_TENANT_ID;
    request.headers[X_DEVICE_ID] = "armaze-web";
    request.headers[X_PRODUCT_NAME] = "ATLAS";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

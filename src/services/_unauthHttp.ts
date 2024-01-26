import axios from "axios";

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    request.headers["X-TENANT-ID"] = 1;
    request.headers["X-DEVICE-ID"] = "armaze-web";
    request.headers["X-PRODUCT-NAME"] = "ATLAS";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

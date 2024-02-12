import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createDatasetApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.dataset.create, payload, {
    headers,
  });
};

export const uploadFileToDatasetApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.dataset.uploadFile, payload, {
    headers,
  });
};

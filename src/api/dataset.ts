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

export const connectConfluenceApi = ({
  source,
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(
    `${config.dataConnectors.connectConfluence}/${source}`,
    payload,
    {
      headers,
    },
  );
};

export const confluenceSpaceDetailsApi = ({
  source,
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(
    `${config.dataConnectors.connectConfluence}/${source}/fetch-data`,
    payload,
    {
      headers,
    },
  );
};

export const addConfluenceFilesToDatasetApi = ({
  source,
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(
    `${config.dataConnectors.connectConfluence}/${source}/pages`,
    payload,
    {
      headers,
    },
  );
};

export const deleteDatasetApi = ({ params = {}, headers = {} }: any) => {
  return _authHttp.delete(config.dataset.delete, {
    params,
    headers,
  });
};

export const deleteDatasetFilesApi = ({ params = {}, headers = {} }: any) => {
  return _authHttp.delete(config.dataset.fileDelete, {
    params,
    headers,
  });
};

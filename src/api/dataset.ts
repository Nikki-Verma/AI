import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createDatasetApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.dataset.create, payload, {
    headers,
  });
};

export const inviteUserApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.identity.inviteUser, payload, {
    headers,
  });
};

export const changeStatusApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.identity.changeStatus, payload, {
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

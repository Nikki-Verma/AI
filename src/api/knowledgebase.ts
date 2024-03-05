import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createKnowledgeBaseApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.knowledgebase.create, payload, {
    headers,
  });
};

export const addFileToKnowledgeBaseApi = ({
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(config.knowledgebase.addFiles, payload, {
    headers,
  });
};

export const getKbPlaygroundResponseApi = ({
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(config.rag.chat, payload, {
    headers,
  });
};

export const getFileChunksApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.rag.chunks, payload, {
    headers,
  });
};

export const deleteKnowledgebaseApi = ({ params = {}, headers = {} }: any) => {
  return _authHttp.delete(config.knowledgebase.delete, {
    params,
    headers,
  });
};

export const deleteKnowledgebaseFilesApi = ({
  params = {},
  headers = {},
}: any) => {
  return _authHttp.delete(config.knowledgebase.fileDelete, {
    params,
    headers,
  });
};
